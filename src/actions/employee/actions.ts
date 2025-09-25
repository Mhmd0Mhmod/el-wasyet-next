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
export async function updateEmployee(id: number, body: EmployeeFormValues) {
  try {
    const parsedBody = await employeeFormSchema.parseAsync(body);
    const { data } = await authFetch.put(`/Employee/${id}`, parsedBody);
    revalidatePath("/employees");
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}
