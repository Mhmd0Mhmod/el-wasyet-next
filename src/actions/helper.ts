import { AxiosError } from "axios";
import { AuthError } from "next-auth";

export const handleErrorResponse = <T>(
  error: Error | AuthError | unknown,
): APIResponse<T> => {
  const returnError = {
    success: false,
    message: "An unexpected error occurred while Process",
  };

  if (error instanceof AuthError) {
    returnError.message = error.message;
  }
  if (error instanceof AxiosError) {
    const errors = Object.values(error.response?.data.errors || {});
    if (errors.length > 0) {
      returnError.message = errors.join(" ");
    } else {
      returnError.message =
        error.response?.data.message ||
        error.response?.data ||
        error.response?.statusText ||
        error.message;
    }
  } else if (error instanceof Error) {
    returnError.message = error.message;
  }

  return returnError as APIResponse<T>;
};
