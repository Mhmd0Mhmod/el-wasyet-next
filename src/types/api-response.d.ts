export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  statusCode: number;
  message: string;
  success: boolean;
}
