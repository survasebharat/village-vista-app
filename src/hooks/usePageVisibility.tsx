import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentVillage } from "@/config/villageConfig";

interface PageVisibilityMap {
  [key: string]: boolean;
}

export const usePageVisibility = () => {
  const [visibility, setVisibility] = useState<PageVisibilityMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageVisibility();

    // Set up real-time subscription for page visibility updates
    const village = getCurrentVillage();
    const channel = supabase
      .channel('page-visibility-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'page_visibility',
          filter: `village_name=eq.${village.name}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const newData = payload.new as any;
            setVisibility((prev) => ({
              ...prev,
              [newData.page_key]: newData.is_visible ?? true
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPageVisibility = async () => {
    try {
      const village = getCurrentVillage();
      
      const { data, error } = await supabase
        .from("page_visibility")
        .select("page_key, is_visible")
        .eq("village_name", village.name);

      if (error) throw error;

      // Convert array to map for easy lookup
      const visibilityMap: PageVisibilityMap = {};
      data?.forEach(item => {
        visibilityMap[item.page_key] = item.is_visible;
      });

      setVisibility(visibilityMap);
    } catch (error) {
      console.error("Error fetching page visibility:", error);
    } finally {
      setLoading(false);
    }
  };

  const isPageVisible = (pageKey: string): boolean => {
    return visibility[pageKey] ?? true; // Default to visible if not found
  };

  return { visibility, isPageVisible, loading };
};
