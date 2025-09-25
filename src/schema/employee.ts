import z from "zod";

const PERMISSIONS_OPTIONS = [
  { id: "download", abilityName: "التحميل" },
  { id: "review", abilityName: "المراجعة" },
  { id: "manage_receipts", abilityName: "إدارة الفواتير" },
] as const;

const VALIDATION_MESSAGES = {
  name: {
    min: "الاسم الكامل يجب أن يحتوي على حرفين على الأقل",
    max: "الاسم الكامل يجب ألا يزيد عن 100 حرف",
  },
  email: {
    invalid: "البريد الإلكتروني غير صحيح",
    required: "البريد الإلكتروني مطلوب",
  },
  phone: {
    min: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل",
    max: "رقم الهاتف يجب ألا يزيد عن 15 رقم",
    invalid: "رقم الهاتف غير صحيح",
  },
  role: {
    min: "الوظيفة يجب أن تحتوي على حرفين على الأقل",
    max: "الوظيفة يجب ألا تزيد عن 50 حرف",
  },
  userName: {
    min: "اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل",
    max: "اسم المستخدم يجب ألا يزيد عن 30 حرف",
    invalid: "اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط",
  },
  password: {
    min: "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل",
  },
  managerName: {
    min: "المدير المباشر يجب أن يحتوي على حرفين على الأقل",
    max: "المدير المباشر يجب ألا يزيد عن 100 حرف",
  },
  abilities: {
    min: "يجب اختيار صلاحية واحدة على الأقل",
  },
};

const employeeFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: VALIDATION_MESSAGES.name.min })
    .max(100, { message: VALIDATION_MESSAGES.name.max }),
  email: z
    .string()
    .email({ message: VALIDATION_MESSAGES.email.invalid })
    .min(1, { message: VALIDATION_MESSAGES.email.required }),
  phone: z
    .string()
    .min(10, { message: VALIDATION_MESSAGES.phone.min })
    .max(15, { message: VALIDATION_MESSAGES.phone.max })
    .regex(/^[\d+\-\s()]+$/, { message: VALIDATION_MESSAGES.phone.invalid }),
  roleId: z
    .string()
    .min(2, { message: VALIDATION_MESSAGES.role.min })
    .max(50, { message: VALIDATION_MESSAGES.role.max }),
  userName: z
    .string()
    .min(3, { message: VALIDATION_MESSAGES.userName.min })
    .max(30, { message: VALIDATION_MESSAGES.userName.max })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: VALIDATION_MESSAGES.userName.invalid,
    }),
  password: z.string().min(6, { message: VALIDATION_MESSAGES.password.min }),
  managerId: z.string().nullable(),
  suspended: z.boolean(),
  abilityIds: z
    .array(z.number())
    .min(1, { message: VALIDATION_MESSAGES.abilities.min }),
  hasViewCashBoxAbility: z.boolean().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export { employeeFormSchema, PERMISSIONS_OPTIONS, VALIDATION_MESSAGES };

export type { EmployeeFormValues };
