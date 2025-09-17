import { ApiResponse } from "./api-response";

export class FetchClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  private async request<T>(
    url: string,
    method: string,
    body?: Record<string, unknown>,
    options?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options,
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${url}`, fetchOptions);
      if (!response.ok) {
        return {
          data: null,
          error: `HTTP error! Status: ${response.status}`,
          statusCode: response.status,
          message: response.statusText,
          success: false,
        };
      }
      let data: T | null = null;
      if (response.status !== 204) {
        data = (await response.json()) as T;
      }

      return {
        data,
        error: null,
        statusCode: response.status,
        message: "Request successful",
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        statusCode: 0,
        message: "Network or parsing error",
        success: false,
      };
    }
  }

  public get<T>(
    endpoint: string,
    options?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "GET", undefined, options);
  }

  public post<T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "POST", body, options);
  }

  public put<T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PUT", body, options);
  }

  public patch<T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PATCH", body, options);
  }
  public delete<T = void>(
    endpoint: string,
    options?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "DELETE", undefined, options);
  }
}
const fetchClient = new FetchClient(process.env.NEXT_PUBLIC_API_BASE_URL || "");
export { fetchClient };
