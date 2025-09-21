"use server";
import { signIn, signOut } from "@/lib/auth";
import { fetchClient } from "@/lib/fetch";
import { LoginFormValues } from "@/schema/login";
import { ApiResponse } from "@/types/api-response";
import { User } from "next-auth";

export async function serverLogin({
  usernameOrEmail,
  password,
  branchId,
}: {
  usernameOrEmail: string;
  password: string;
  branchId: string;
}): Promise<ApiResponse<User>> {
  const response = await fetchClient.post<User>("Auth/login", {
    body: {
      usernameOrEmail,
      password,
      branchId,
    },
  });
  return response;
}
export async function Login(formData: LoginFormValues) {
  const { usernameOrEmail, password, branchId } = formData;
  try {
    await signIn("credentials", {
      usernameOrEmail,
      password,
      branchId,
      redirect: false,
    });
    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Login failed",
    };
  }
}

export async function Logout() {
  await signOut({ redirect: false });
}
