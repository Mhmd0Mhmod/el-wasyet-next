// interface APIResponse<T> {
//   data: T;
//   success: boolean;
//   message: true extends true ? string | undefined : string;
// }

// Alternative cleaner approach using conditional types
type APIResponse<T> = {
  data: T;
} & ({ success: true; message?: string } | { success: false; message: string });
