import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentVillage } from "@/config/villageConfig";

export interface Geography {
  altitude: string;
  latitude: string;
  longitude: string;
}

export interface HeroImage {
  alt: string;
  src: string;
}

export interface Population {
  male: number;
  total: number;
  female: number;
  literacy: string;
}

export interface VillageData {
  area: string;
  name: string;
  state: string;
  vision: string;
  culture: string[];
  pincode: string;
  district: string;
  geography: Geography;
  heroImages: HeroImage[];
  population: Population;
  description: string;
  established: string;
}

export interface Office {
  email: string;
  hours: string;
  phone: string;
  address: string;
  website: string;
}

export interface Emergency {
  fire: string;
  police: string;
  ambulance: string;
  local_emergency: string;
}

export interface VillageConfig {
  village: VillageData;
  panchayat: any;
  announcements: any[];
  schemes: any[];
  developmentWorks: any;
  gallery: any[];
  contact: {
    office: Office;
    emergency: Emergency;
  };
  documents: any[];
  services: any[];
}

export const useVillageConfig = (village?: string, language: string = 'en') => {
  const [config, setConfig] = useState<VillageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {name} = getCurrentVillage();

  let villageName = name || village
  
  // Normalize language code to base language (e.g., 'en-US' -> 'en')
  const normalizedLanguage = language.split('-')[0]
  
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        // If no village name specified, use static data as fallback
        if (!villageName) {
          setLoading(false);
          return;
        }

        // Fetch village ID
        const { data: villageData, error: villageError } = await supabase
          .from("villages")
          .select("id")
          .eq("name", villageName)
          .single();

        if (villageError) {
          console.error("Error fetching village:", villageError);
          // Fallback to static data
          setLoading(false);
          return;
        }

        // Fetch config from database with language filter
        const { data: configData, error: configError } = await supabase
          .from("village_config")
          .select("config_data")
          .eq("village_id", villageData.id)
          .eq("language", normalizedLanguage)
          .maybeSingle();

        if (configError) {
          console.error("Error fetching config:", configError);
          setError(configError.message);
          // Fallback to static data
        } else if (configData) {
          // Handle nested config_data structure (if user saved entire payload)
          let parsedConfig = configData.config_data as any;
          if (parsedConfig?.config_data) {
            // Data is double-nested, unwrap it
            parsedConfig = parsedConfig.config_data;
          }
          setConfig(parsedConfig);
        } else {
          // No config in database, use static data
        }
      } catch (err) {
        console.error("Error in fetchConfig:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback to static data
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();

    // Set up real-time subscription for village config updates
    const channel = supabase
      .channel("village-config-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "village_config",
        },
        (payload) => {
          if (
            payload.eventType === "UPDATE" ||
            payload.eventType === "INSERT"
          ) {
            const newData = payload.new as any;
            let parsedConfig = newData.config_data as any;
            // Handle nested config_data structure
            if (parsedConfig?.config_data) {
              parsedConfig = parsedConfig.config_data;
            }
            setConfig(parsedConfig);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [villageName, normalizedLanguage]);

  return { config, loading, error };
};
