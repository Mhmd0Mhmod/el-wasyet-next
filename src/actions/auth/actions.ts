"use server";
import { auth, signIn, signOut } from "@/lib/auth";
import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { LoginFormValues } from "@/schema/login";
import { User } from "next-auth";

export async function serverLogin({
  usernameOrEmail,
  password,
  branchId,
}: {
  usernameOrEmail: string;
  password: string;
  branchId: string;
}): Promise<APIResponse<User | null>> {
  try {
    const { data } = await authFetch.post<User>("Auth/login", {
      usernameOrEmail,
      password,
      branchId,
    });

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
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

export async function getCurrentUser() {
  return await auth();
}
export async function getToken() {
  return (await auth())?.user.token;
}
