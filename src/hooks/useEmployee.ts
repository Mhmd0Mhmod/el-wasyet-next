import { getEmployeeById } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useEmployee(employeeId: number | undefined) {
  const {
    data: employee,
    error,
    isLoading,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId as number),
    enabled: !!employeeId,
  });
  return { employee, error, isLoading, isFetched, isFetching };
}
export { useEmployee };
