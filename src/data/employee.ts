import { AxiosError } from "axios";
import { authFetch } from "../lib/axios";
import { defaults } from "../lib/utils";

export async function getEmployees({
  search = null,
  page = 1,
}: {
  search?: string | null;
  page?: number;
} = {}): Promise<PaginatedResponse<ShortEmployee>> {
  try {
    const { data } = await authFetch.get<PaginatedResponse<ShortEmployee>>(
      `Employee/all`,
      {
        params: {
          search: search,
          pageSize: defaults.pageSize,
          pageIndex: page,
        },
      },
    );

    return (
      data || {
        items: [],
        totalPages: 0,
        pageSize: defaults.pageSize,
        pageNumber: page,
        hasNextPage: false,
        hasPreviousPage: false,
        totalRecords: 0,
      }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching employees");
  }
}

export async function getRoles(): Promise<Role[]> {
  try {
    const { data } = await authFetch.get<Role[]>(`Auth/roles`);
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching roles");
  }
}

export async function getAbilitiesByRole(role: Role): Promise<Ability[]> {
  try {
    const { data } = await authFetch.get<Ability[]>(
      `/Auth/abilities/for-role/${role.id}`,
      {
        params: { roleName: role.name },
      },
    );
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching abilities");
  }
}

export async function getEmployeeById(employeeId: number): Promise<Employee> {
  try {
    const { data } = await authFetch.get<Employee>(`Employee/${employeeId}`);
    return data || null;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching employee");
  }
}

export async function getEmployeeBasic(): Promise<BasicEntity[]> {
  try {
    const { data } = await authFetch.get<BasicEntity[]>(
      `Employee/GeTemployeesForOthers`,
    );
    return data || null;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error(
      "An unexpected error occurred while fetching employee basic data",
    );
  }
}
