import { ShortWorkFlow } from "@/types/service";
import z from "zod";

// Error messages constants
const ERROR_MESSAGES = {
  REQUIRED_NAME: "الاسم مطلوب",
  INVALID_DEFAULT_FEES: "الرسوم الافتراضية يجب أن تكون غير سالبة",
  INVALID_VALIDITY_PERIOD: "فترة الصلاحية يجب أن تكون موجبة",
  INVALID_EXPIRY_PERIOD: "فترة الانتهاء يجب أن تكون موجبة",
  REQUIRED_DOCUMENT_DESCRIPTION: "وصف الوثيقة مطلوب",
  REQUIRED_WORKFLOW_STATUS: "حالة سير العمل مطلوبة",
  INVALID_WORKFLOW_STATUS: "حالة سير العمل غير صالحة",
  REQUIRED_SEQUENCE: "وصف سير العمل مطلوب",
  INVALID_VALUE: "القيمة يجب أن تكون غير سالبة",
  REQUIRED_DESCRIPTION: "الوصف مطلوب",
  INVALID_PENALTY_BANK_FEE: "نسبة رسوم البنك للغرامة يجب أن تكون غير سالبة",
  INVALID_PENALTY_EXTRA_FEE: "الرسوم الإضافية للغرامة يجب أن تكون غير سالبة",
  REQUIRED_FORM_TYPE: "نوع النموذج مطلوب عند تفعيل النماذج",
  REQUIRED_PENALTY_BANK_FEE: "نسبة رسوم البنك للغرامة مطلوبة عند تفعيل الغرامة",
  REQUIRED_PENALTY_EXTRA_FEE:
    "الرسوم الإضافية للغرامة مطلوبة عند تفعيل الغرامة",
  REQUIRED_RELATED_AGENT: "حقل الوكيل المرتبط مطلوب عند تفعيل الغرامة",
  EXCLUSIVE_OPTIONS:
    "يمكن تفعيل خيار واحد فقط من: الغرامة، النماذج، أو الرسوم الإدارية",
} as const;

// Document schema
const documentSchema = z.object({
  description: z.string().min(1, ERROR_MESSAGES.REQUIRED_DOCUMENT_DESCRIPTION),
});

// Workflow schema factory
const createWorkflowSchema = (workFlows: ShortWorkFlow[]) =>
  z.object({
    orderStatusId: z
      .number()
      .min(1, ERROR_MESSAGES.REQUIRED_WORKFLOW_STATUS)
      .refine(
        (val) => workFlows.some((workflow) => workflow.id === Number(val)),
        { message: ERROR_MESSAGES.INVALID_WORKFLOW_STATUS },
      ),
    sequence: z.number().min(1, ERROR_MESSAGES.REQUIRED_SEQUENCE),
  });

// Helper functions for validation
const isFieldRequired = (value: unknown): boolean =>
  value === undefined || value === null;

const addValidationIssue = (
  ctx: z.RefinementCtx,
  path: string,
  message: string,
): void => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message,
    path: [path],
  });
};

// Type for overhead data
type OverheadData = {
  value: number;
  description: string;
  penalty?: boolean;
  forms?: boolean;
  adminFees?: boolean;
  penaltyBankFeePrecentage?: number;
  penaltyExtraFee?: number;
  relatedAgent?: boolean;
  formTypeID?: number | null;
};

// Overhead validation functions
const validateFormRequirements = (
  data: OverheadData,
  ctx: z.RefinementCtx,
): void => {
  if (data.forms === true && isFieldRequired(data.formTypeID)) {
    addValidationIssue(ctx, "formTypeID", ERROR_MESSAGES.REQUIRED_FORM_TYPE);
  }
};

const validatePenaltyRequirements = (
  data: OverheadData,
  ctx: z.RefinementCtx,
): void => {
  if (data.penalty !== true) return;

  const penaltyValidations = [
    {
      field: "penaltyBankFeePrecentage",
      message: ERROR_MESSAGES.REQUIRED_PENALTY_BANK_FEE,
    },
    {
      field: "penaltyExtraFee",
      message: ERROR_MESSAGES.REQUIRED_PENALTY_EXTRA_FEE,
    },
    { field: "relatedAgent", message: ERROR_MESSAGES.REQUIRED_RELATED_AGENT },
  ] as const;

  penaltyValidations.forEach(({ field, message }) => {
    if (isFieldRequired(data[field])) {
      addValidationIssue(ctx, field, message);
    }
  });
};

const validateExclusiveOptions = (
  data: OverheadData,
  ctx: z.RefinementCtx,
): void => {
  const activeOptions = [
    data.penalty === true,
    data.forms === true,
    data.adminFees === true,
  ].filter(Boolean).length;

  if (activeOptions > 1) {
    addValidationIssue(ctx, "penalty", ERROR_MESSAGES.EXCLUSIVE_OPTIONS);
  }
};

export const overheadSchema = z
  .object({
    value: z.number().min(0, ERROR_MESSAGES.INVALID_VALUE),
    description: z.string().min(1, ERROR_MESSAGES.REQUIRED_DESCRIPTION),
    penalty: z.boolean().optional(),
    forms: z.boolean().optional(),
    adminFees: z.boolean().optional(),
    penaltyBankFeePrecentage: z
      .number()
      .min(0, ERROR_MESSAGES.INVALID_PENALTY_BANK_FEE)
      .optional(),
    penaltyExtraFee: z
      .number()
      .min(0, ERROR_MESSAGES.INVALID_PENALTY_EXTRA_FEE)
      .optional(),
    relatedAgent: z.boolean().optional(),
    formTypeID: z.number().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    validateFormRequirements(data, ctx);
    validatePenaltyRequirements(data, ctx);
    validateExclusiveOptions(data, ctx);
  });

// Main service schema generator
export const generateServiceSchema = (workFlows: ShortWorkFlow[]) =>
  z.object({
    Name: z.string().min(1, ERROR_MESSAGES.REQUIRED_NAME),
    defaultFees: z.number().min(0, ERROR_MESSAGES.INVALID_DEFAULT_FEES),
    validityPeriodDays: z
      .number()
      .min(0, ERROR_MESSAGES.INVALID_VALIDITY_PERIOD),
    expiryPeriodYears: z.number().min(0, ERROR_MESSAGES.INVALID_EXPIRY_PERIOD),
    isCertificate: z.boolean(),
    documents: z.array(documentSchema),
    Workflows: z.array(createWorkflowSchema(workFlows)),
    overheads: z.array(overheadSchema),
  });

export type ServiceValues = z.infer<ReturnType<typeof generateServiceSchema>>;
