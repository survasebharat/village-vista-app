import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CUSTOM_ROUTES } from "@/custom-routes";

interface PageVisibility {
  id: string;
  village_name: string;
  page_key: string;
  page_label: string;
  is_visible: boolean;
}

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState("Shivankhed");
  const [pages, setPages] = useState<PageVisibility[]>([]);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchPageVisibility();
    }
  }, [isAdmin, selectedVillage]);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("Error checking admin role:", roleError);
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!roleData) {
        toast({
          title: "Access Denied",
          description: "Only administrators can access this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchPageVisibility = async () => {
    try {
      const { data, error } = await supabase
        .from("page_visibility")
        .select("*")
        .eq("village_name", selectedVillage)
        .order("page_key");

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error("Error fetching pages:", error);
      toast({
        title: "Error",
        description: "Failed to load page visibility settings.",
        variant: "destructive",
      });
    }
  };

  const handleToggleVisibility = async (pageId: string, currentVisibility: boolean) => {
    setUpdating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase
        .from("page_visibility")
        .update({
          is_visible: !currentVisibility,
          updated_at: new Date().toISOString(),
          updated_by: session?.user.id,
        })
        .eq("id", pageId);

      if (error) throw error;

      // Update local state
      setPages(pages.map(page => 
        page.id === pageId ? { ...page, is_visible: !currentVisibility } : page
      ));

      toast({
        title: "Updated",
        description: "Page visibility has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast({
        title: "Error",
        description: "Failed to update page visibility.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Admin Header */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">Admin Panel</CardTitle>
                    <CardDescription>
                      Manage page visibility and village data
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Management</CardTitle>
              <CardDescription>
                Access different management sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-start gap-2"
                  onClick={() => navigate(CUSTOM_ROUTES.VILLAGE_MANAGEMENT)}
                >
                  <div className="text-lg font-semibold">🏘️ Village Management</div>
                  <div className="text-sm text-muted-foreground text-left">
                    Add, edit, and manage village information
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-start gap-2"
                  onClick={() => navigate(CUSTOM_ROUTES.JSON_CONFIG)}
                >
                  <div className="text-lg font-semibold">📝 JSON Configuration</div>
                  <div className="text-sm text-muted-foreground text-left">
                    Edit village configuration data dynamically
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-start gap-2"
                  onClick={() => navigate(CUSTOM_ROUTES.CONTACT_MESSAGE)}
                >
                  <div className="text-lg font-semibold">📧 Contact Messages</div>
                  <div className="text-sm text-muted-foreground text-left">
                    View and manage contact form submissions
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-start gap-2"
                  disabled
                >
                  <div className="text-lg font-semibold">📢 Announcements</div>
                  <div className="text-sm text-muted-foreground text-left">
                    Manage village announcements (Coming Soon)
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Village Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Village</CardTitle>
              <CardDescription>
                Choose a village to manage its page visibility settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select village" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shivankhed">Shivankhed</SelectItem>
                  <SelectItem value="Gudsoor">Gudsoor</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Page Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Page Visibility for {selectedVillage}</CardTitle>
              <CardDescription>
                Toggle pages on/off for this village
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <Label
                      htmlFor={page.id}
                      className="text-base font-medium cursor-pointer"
                    >
                      {page.page_label}
                    </Label>
                    <Switch
                      id={page.id}
                      checked={page.is_visible}
                      onCheckedChange={() => handleToggleVisibility(page.id, page.is_visible)}
                      disabled={updating}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
