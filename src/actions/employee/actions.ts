"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { EmployeeFormValues, employeeFormSchema } from "@/schema/employee";
import { revalidatePath } from "next/cache";

export async function createEmployee(
  body: EmployeeFormValues,
): Promise<APIResponse<Employee | null>> {
  try {
    const parsedBody = await employeeFormSchema.parseAsync(body);
    const { data } = await authFetch.post(
      "/Auth/register/employee",
      parsedBody,
    );
    revalidatePath("/employees");
    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function updateEmployee(
  body: EmployeeFormValues,
): Promise<APIResponse<Employee | null>> {
  try {
    const parsedBody = await employeeFormSchema.parseAsync(body);
    const { data } = await authFetch.put(`Auth/edit/employee`, parsedBody);
    revalidatePath("/employees");
    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
