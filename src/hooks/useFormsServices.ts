import { getForms } from "@/data/services";
import { useQuery } from "@tanstack/react-query";

function useFormsServices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["forms-service"],
    queryFn: getForms,
    initialData: [],
  });

  return {
    forms: data,
    isLoadingForms: isLoading,
    formsError: error,
  };
}
export { useFormsServices };
