import { getCabins } from "./../../services/apiCabins";

import { useQuery } from "@tanstack/react-query";

export function useCabin() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isPending, cabins, error };
}
