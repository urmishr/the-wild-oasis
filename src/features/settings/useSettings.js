import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isPending: isSettingsLoading,
    error: settingsError,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isSettingsLoading, settings, settingsError };
}
