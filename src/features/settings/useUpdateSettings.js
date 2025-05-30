import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation(
    {
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        toast.success("The setting has been saved");
        queryClient.invalidateQueries(["settings"]);
      },
    },
  );
  return { updateSettings, isUpdatingSettings };
}
