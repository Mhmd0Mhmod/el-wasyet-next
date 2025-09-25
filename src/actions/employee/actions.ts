"use server";

import { authFetch } from "@/lib/axios";
import { EmployeeFormValues, employeeFormSchema } from "@/schema/employee";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function createEmployee(body: EmployeeFormValues) {
  try {
    const parsedBody = await employeeFormSchema.parseAsync(body);
    const { data } = await authFetch.post(
      "/Auth/register/employee",
      parsedBody,
    );
    revalidatePath("/employees");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error creating employee:", error.response?.data);
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) throw new Error(error?.message);
    throw new Error("An unexpected error occurred");
  }
}
export async function updateEmployee(body: EmployeeFormValues) {
  try {
    const parsedBody = await employeeFormSchema.parseAsync(body);
    const { data } = await authFetch.put(`Auth/edit/employee`, parsedBody);
    revalidatePath("/employees");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating employee:", error.response?.data);
      throw new Error(
        Object.values(error.response?.data?.errors || {})
          .flat()
          .join(" ") || error.message,
      );
    }
    if (error instanceof Error) throw new Error(error?.message);
    throw new Error("An unexpected error occurred");
  }
}
