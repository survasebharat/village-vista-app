import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGramsevak, setIsGramsevak] = useState(false);
  const [isSubAdmin, setIsSubAdmin] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check roles and approval status when session changes
        if (session?.user) {
          setTimeout(() => {
            checkUserRoles(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsGramsevak(false);
          setIsSubAdmin(false);
          setIsApproved(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          checkUserRoles(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRoles = async (userId: string) => {
    try {
      console.log("🔍 Checking roles for user:", userId);
      
      // Check roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      
      console.log("📊 Roles data:", rolesData, "Error:", rolesError);
      
      const roles = rolesData?.map(r => r.role) || [];
      const hasAdmin = roles.includes("admin");
      const hasGramsevak = roles.includes("gramsevak");
      const hasSubAdmin = roles.includes("sub_admin");
      
      console.log("👤 User roles:", { hasAdmin, hasGramsevak, hasSubAdmin });
      
      setIsAdmin(hasAdmin);
      setIsGramsevak(hasGramsevak);
      setIsSubAdmin(hasSubAdmin);

      // Check approval status
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("approval_status")
        .eq("id", userId)
        .maybeSingle();
      
      console.log("✅ Profile data:", profileData, "Error:", profileError);
      
      const approved = profileData?.approval_status === "approved";
      console.log("🎯 Is approved:", approved);
      
      setIsApproved(approved);
    } catch (error) {
      console.error("❌ Error checking user roles:", error);
      setIsAdmin(false);
      setIsGramsevak(false);
      setIsSubAdmin(false);
      setIsApproved(false);
    }
  };

  return { user, session, loading, isAdmin, isGramsevak, isSubAdmin, isApproved };
};
