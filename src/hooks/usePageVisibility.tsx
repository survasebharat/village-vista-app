import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VILLAGES } from "@/config/villageConfig";

interface PageVisibilityMap {
  [key: string]: boolean;
}

export const usePageVisibility = () => {
  const [visibility, setVisibility] = useState<PageVisibilityMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageVisibility();

    const channel = supabase
      .channel('page-visibility-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'page_visibility',
          filter: `village_name=eq.${VILLAGES.shivankhed.name}`
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
      
      const { data, error } = await supabase
        .from("page_visibility")
        .select("page_key, is_visible")
        .eq("village_name", VILLAGES.shivankhed.name);

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
    return visibility[pageKey] ?? true; 
  };

  return { visibility, isPageVisible, loading };
};
