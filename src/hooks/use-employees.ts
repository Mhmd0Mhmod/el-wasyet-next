import { getEmployeeBasic } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployeeBasic,
  });
}
export { useEmployees };
