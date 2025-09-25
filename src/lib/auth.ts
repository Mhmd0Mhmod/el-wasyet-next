import { serverLogin } from "@/actions/auth/actions";
import { loginFormSchema } from "@/schema/login";
import NextAuth, {
  AuthError,
  CredentialsSignin,
  DefaultSession,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  interface User {
    isAuthenticated: boolean;
    token: string;
    expiresOn: string;
    userId: string;
    email: string;
    name: string;
    loggedId: number;
    branchId: number;
    message: string | null;
    abilities: Ability[];
  }
}
class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "CustomError";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        usernameOrEmail: {
          label: "Username or Email",
          type: "text",
          placeholder: "Username or Email",
        },
        branchId: {
          label: "Branch ID",
          type: "text",
          placeholder: "Branch ID",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        try {
          const parseResult = await loginFormSchema.parseAsync(credentials);
          const { usernameOrEmail, branchId, password } = parseResult;
          const response = await serverLogin({
            usernameOrEmail,
            branchId,
            password,
          });

          return response;
        } catch (error) {
          if (error instanceof AuthError) {
            throw new CustomError(error.message);
          }
          if (error instanceof Error) {
            throw new CustomError(error.message);
          }
          throw new CustomError("An unknown error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAuthenticated = user.isAuthenticated;
        token.accessToken = user.token;
        token.expiresOn = user.expiresOn;
        token.userId = user.userId;
        token.loggedId = user.loggedId;
        token.branchId = user.branchId;
        token.message = user.message;
        token.abilities = user.abilities;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAuthenticated = token.isAuthenticated as boolean;
      session.user.token = token.accessToken as string;
      session.user.expiresOn = token.expiresOn as string;
      session.user.userId = token.userId as string;
      session.user.loggedId = token.loggedId as number;
      session.user.branchId = token.branchId as number;
      session.user.message = token.message as string | null;
      session.user.abilities = token.abilities as Ability[];
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
