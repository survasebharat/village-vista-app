import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import villageDataStatic from "@/data/villageData.json";

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

export const useVillageConfig = (villageName?: string) => {
  const [config, setConfig] = useState<VillageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        // If no village name specified, use static data as fallback
        if (!villageName) {
          setConfig(villageDataStatic as any);
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
          setConfig(villageDataStatic as any);
          setLoading(false);
          return;
        }

        // Fetch config from database
        const { data: configData, error: configError } = await supabase
          .from("village_config")
          .select("config_data")
          .eq("village_id", villageData.id)
          .maybeSingle();

        if (configError) {
          console.error("Error fetching config:", configError);
          setError(configError.message);
          // Fallback to static data
          setConfig(villageDataStatic as any);
        } else if (configData) {
          setConfig(configData.config_data as any);
        } else {
          // No config in database, use static data
          setConfig(villageDataStatic as any);
        }
      } catch (err) {
        console.error("Error in fetchConfig:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback to static data
        setConfig(villageDataStatic as any);
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
            setConfig(newData.config_data as any);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [villageName]);

  return { config, loading, error };
};
