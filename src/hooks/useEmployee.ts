import { getEmployeeById } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useEmployee(employeeId: number) {
  const {
    data: employee,
    error,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
    initialData: {} as Employee,
  });
  return { employee, error, isLoading, isFetched };
}
export { useEmployee };
