import { createContext, useMemo, ReactNode } from "react";
import { useVillageConfig, VillageConfig } from "@/hooks/useVillageConfig";
import { usePageVisibility } from "@/hooks/usePageVisibility";

type VillageContextType = {
  config: VillageConfig | null;
  loading: boolean;
  error: any;
  isPageVisible: (pageKey: string) => boolean;
};

export const VillageContext = createContext<VillageContextType>({
  config: null,
  loading: false,
  error: null,
  isPageVisible: () => true,
});

type VillageProviderProps = {
  children: ReactNode;
  villageName?: string;
};

export const VillageProvider = ({
  children,
  villageName = "Shivankhed",
}: VillageProviderProps) => {
  const { config, loading, error } = useVillageConfig(villageName);
  const { isPageVisible, loading: isLoading } = usePageVisibility();

  const value = useMemo(
    () => ({ config, loading: loading || isLoading, error, isPageVisible }),
    [config, loading, isLoading, error, isPageVisible]
  );

  return (
    <VillageContext.Provider value={value}>{children}</VillageContext.Provider>
  );
};
