import { ApiResponse } from "./api-response";

interface RequestOptions {
  query?: Record<
    string | number,
    string | number | string[] | number[] | null | undefined
  >;
  body?: Record<string, unknown>;
  headers?: HeadersInit;
}

export class FetchClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildQueryString(
    query: Record<
      string | number,
      string | number | string[] | number[] | null | undefined
    >,
  ): string {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, String(item)));
      }
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });
    return params.toString();
  }

  private async request<T>(
    url: string,
    method: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    let fullUrl = `${this.baseUrl}/${url}`;
    if (options?.query) {
      const queryString = this.buildQueryString(options.query);
      if (queryString) {
        fullUrl += `?${queryString}`;
      }
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (options?.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(fullUrl, fetchOptions);
      console.log(fullUrl);

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
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "GET", options);
  }

  public post<T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "POST", options);
  }

  public put<T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PUT", options);
  }

  public patch<T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PATCH", options);
  }
  public delete<T = void>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "DELETE", options);
  }
}
const fetchClient = new FetchClient(process.env.NEXT_PUBLIC_API_BASE_URL || "");
export { fetchClient };
