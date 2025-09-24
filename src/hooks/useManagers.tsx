import { getManagers } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";


export const useManagers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["managers"],
        queryFn: getManagers,
    });
    return { data, isLoading, error };
}
