"use server";
import { handleErrorResponse } from "@/actions/helper";
import { can } from "@/constants/abilities";
import { auth, signIn, signOut } from "@/lib/auth";
import { authFetch } from "@/lib/axios";
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
}): Promise<APIResponse<User>> {
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
  return (await auth())?.user;
}
export async function getToken() {
  return (await auth())?.user.token;
}
export async function getCurrentEmployeeId() {
  return (await auth())?.user.userId;
}

export async function checkAccess(abilityId: number) {
  const user = await getCurrentUser();
  if (!user) return false;
  const userAbilities = (user.abilities || []).map((a) => a.id);
  return can(userAbilities, abilityId);
}
