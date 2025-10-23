// interface APIResponse<T> {
//   data: T;
//   success: boolean;
//   message: true extends true ? string | undefined : string;
// }

// Alternative cleaner approach using conditional types
type APIResponse<T = undefined> =
  | { success: true; message?: string; data: T }
  | { success: false; message: string; data?: T };
