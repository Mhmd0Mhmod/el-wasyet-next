"use server";

import { authFetch } from "@/lib/axios";
import { EmployeeFormValues, employeeFormSchema } from "@/schema/employee";
import { AxiosError } from "axios";

export async function createEmployee(body: EmployeeFormValues) {
  // Call your API to create an employee
  try {
    const parsedBody = await employeeFormSchema.parseAsync(body);
    const { data } = await authFetch.post("/Auth/register/employee", {
      ...parsedBody,
      hasViewCashBoxAbility: true,
      title: "string",
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error creating employee:", error.response?.data);
      throw new Error(
        Object.values(error.response?.data?.errors).join(", ") || error.message,
      );
    }
    if (error instanceof Error) throw new Error(error?.message);
    throw new Error("An unexpected error occurred");
  }
}
export async function updateEmployee(id: number, body: EmployeeFormValues) {
  // Call your API to update an employee
  try {
    const { data } = await authFetch.put(`/Employee/${id}`, body);
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}
