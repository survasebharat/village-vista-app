import { createContext, useMemo, ReactNode } from "react";
import { useVillageConfig, VillageConfig } from "@/hooks/useVillageConfig";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { config, loading: configLoading, error } = useVillageConfig(villageName, currentLanguage);
  const { isPageVisible, loading: visibilityLoading } = usePageVisibility();

  const value = useMemo(
    () => ({ 
      config, 
      loading: configLoading || visibilityLoading, 
      error, 
      isPageVisible 
    }),
    [config, configLoading, visibilityLoading, error, isPageVisible]
  );

  return (
    <VillageContext.Provider value={value}>{children}</VillageContext.Provider>
  );
};
