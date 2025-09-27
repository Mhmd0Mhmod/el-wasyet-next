import { getEmployeeById } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useEmployee(employeeId: number) {
  const {
    data: employee,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
  });
  return { employee, error, isLoading };
}
export { useEmployee };
