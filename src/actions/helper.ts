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
    const responseData = error.response?.data;
    const errors = Object.values(responseData?.errors || {});
    if (errors.length > 0) {
      returnError.message = errors.join(" ");
    } else {
      // Handle different error response formats
      // Priority: message > title (Problem Details format) > statusText > generic error message
      const message =
        responseData?.message ||
        responseData?.title || // ASP.NET Problem Details format
        (typeof responseData === "string" ? responseData : null) ||
        error.response?.statusText ||
        error.message;
      returnError.message = message;
    }
  } else if (error instanceof Error) {
    returnError.message = error.message;
  }

  return returnError as APIResponse<T>;
};
