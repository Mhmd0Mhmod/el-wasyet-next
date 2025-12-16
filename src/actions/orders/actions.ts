"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { OrderFormValues } from "@/schema/order";
import { Order } from "@/types/order";

export async function createOrder(
  formData: OrderFormValues,
): Promise<APIResponse<number>> {
  try {
    const form = generateFormData(formData);
    const res = await authFetch.post<{
      message: string;
      orderId: number;
    }>("Order/create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      message: res.data.message,
      data: res.data.orderId,
    };
  } catch (err) {
    return handleErrorResponse(err);
  }
}

export async function updateOrder(
  id: number,
  formData: OrderFormValues,
): Promise<APIResponse<Order>> {
  try {
    const form = generateFormData(formData);
    const res = await authFetch.put<Order>(`Order/update/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return handleErrorResponse(err);
  }
}

function generateFormData(formData: OrderFormValues): FormData {
  const form = new FormData();
  form.append("ClientId", formData.ClientId?.toString());
  form.append("RequiredChange", formData.RequiredChange);
  form.append("ServiceId", formData.ServiceId?.toString());
  form.append("Cash", formData.Cash?.toString());
  form.append("Credit", formData.Credit?.toString());
  form.append("Amount", formData.Amount?.toString());
  form.append("ServiceFees", formData.ServiceFees?.toString());
  form.append("IsPending", formData.IsPending?.toString());

  // Add optional fields
  if (formData.Notes) {
    form.append("Notes", formData.Notes);
  }
  if (formData.DeliveryAddress) {
    form.append("DeliveryAddress", formData.DeliveryAddress);
  }
  if (formData.BirthDate) {
    form.append("BirthDate", formData.BirthDate);
  }
  if (formData.Quantity) {
    form.append("Quantity", formData.Quantity?.toString());
  }
  if (formData.OfferId) {
    form.append("OfferId", formData.OfferId?.toString());
    form.append("ImageUrlForOffer", formData.ImageUrlForOffer as Blob);
  }
  if (formData.AgentId) {
    form.append("AgentId", formData.AgentId?.toString());
  }

  // Add arrays
  formData.Documents.forEach((docId, index) => {
    form.append(`Documents[${index}]`, docId?.toString());
  });

  formData.OverheadIds?.forEach((overheadId, index) => {
    form.append(`OverheadIds[${index}]`, overheadId?.toString());
  });

  // Add custom documents
  if (formData.CustomDocuments) {
    formData.CustomDocuments.forEach((customDoc, index) => {
      if (customDoc.Description) {
        form.append(
          `CustomDocuments[${index}].Description`,
          customDoc.Description,
        );
      }
    });
  }

  // Add custom overheads
  if (formData.CustomOverheads) {
    formData.CustomOverheads.forEach((overhead, index) => {
      form.append(
        `CustomOverheads[${index}].description`,
        overhead.description,
      );
      form.append(
        `CustomOverheads[${index}].value`,
        overhead.value?.toString(),
      );
      if (overhead.penalty) {
        form.append(
          `CustomOverheads[${index}].penalty`,
          overhead.penalty?.toString(),
        );
      }
      if (overhead.forms) {
        form.append(
          `CustomOverheads[${index}].forms`,
          overhead.forms?.toString(),
        );
      }
      if (overhead.adminFees) {
        form.append(
          `CustomOverheads[${index}].adminFees`,
          overhead.adminFees?.toString(),
        );
      }
      if (overhead.penaltyBankFeePrecentage) {
        form.append(
          `CustomOverheads[${index}].penaltyBankFeePrecentage`,
          overhead.penaltyBankFeePrecentage?.toString(),
        );
      }
      if (overhead.penaltyExtraFee) {
        form.append(
          `CustomOverheads[${index}].penaltyExtraFee`,
          overhead.penaltyExtraFee?.toString(),
        );
      }
      if (overhead.relatedAgent) {
        form.append(
          `CustomOverheads[${index}].relatedAgent`,
          overhead.relatedAgent?.toString(),
        );
      }
      if (overhead.formTypeID && overhead.formTypeID !== null) {
        form.append(
          `CustomOverheads[${index}].formTypeID`,
          overhead.formTypeID?.toString(),
        );
      }
    });
  }

  // Add files
  if (formData.CreateFiles) {
    formData.CreateFiles.forEach((fileData, index) => {
      form.append(
        `CreateFiles[${index}].FileTypeId`,
        fileData.FileTypeId?.toString(),
      );
      form.append(`CreateFiles[${index}].File`, fileData.File!);
      if (fileData.OrderId) {
        form.append(
          `CreateFiles[${index}].OrderId`,
          fileData.OrderId?.toString(),
        );
      }
    });
  }

  return form;
}
