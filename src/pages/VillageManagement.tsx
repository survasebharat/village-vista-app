import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Village {
  id: string;
  name: string;
  state: string;
  district: string;
  pincode: string;
  established: string | null;
  area: string | null;
  description: string | null;
  vision: string | null;
  is_active: boolean;
}

const VillageManagement = () => {
  const [loading, setLoading] = useState(true);
  const [villages, setVillages] = useState<Village[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVillage, setEditingVillage] = useState<Village | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    pincode: "",
    established: "",
    area: "",
    description: "",
    vision: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchVillages();
  }, []);

  const fetchVillages = async () => {
    try {
      const { data, error } = await supabase
        .from("villages")
        .select("*")
        .order("name");

      if (error) throw error;
      setVillages(data || []);
    } catch (error) {
      console.error("Error fetching villages:", error);
      toast({
        title: "Error",
        description: "Failed to load villages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingVillage) {
        const { error } = await supabase
          .from("villages")
          .update(formData)
          .eq("id", editingVillage.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Village updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from("villages")
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Village created successfully.",
        });
      }

      setIsDialogOpen(false);
      setEditingVillage(null);
      resetForm();
      fetchVillages();
    } catch (error: any) {
      console.error("Error saving village:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save village.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (village: Village) => {
    setEditingVillage(village);
    setFormData({
      name: village.name,
      state: village.state,
      district: village.district,
      pincode: village.pincode,
      established: village.established || "",
      area: village.area || "",
      description: village.description || "",
      vision: village.vision || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this village?")) return;

    try {
      const { error } = await supabase
        .from("villages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Village deleted successfully.",
      });

      fetchVillages();
    } catch (error) {
      console.error("Error deleting village:", error);
      toast({
        title: "Error",
        description: "Failed to delete village.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      state: "",
      district: "",
      pincode: "",
      established: "",
      area: "",
      description: "",
      vision: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
            <h1 className="text-3xl font-bold">Village Management</h1>
          </div>
          <Button onClick={() => {
            resetForm();
            setEditingVillage(null);
            setIsDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Village
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Villages</CardTitle>
            <CardDescription>Manage village information and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Pincode</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {villages.map((village) => (
                  <TableRow key={village.id}>
                    <TableCell className="font-medium">{village.name}</TableCell>
                    <TableCell>{village.district}</TableCell>
                    <TableCell>{village.state}</TableCell>
                    <TableCell>{village.pincode}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(village)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(village.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVillage ? "Edit Village" : "Add New Village"}
              </DialogTitle>
              <DialogDescription>
                {editingVillage ? "Update village information" : "Create a new village entry"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Village Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input
                    id="established"
                    value={formData.established}
                    onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g., 15.2 sq km"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Vision</Label>
                <Textarea
                  id="vision"
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  rows={2}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingVillage ? "Update" : "Create"} Village
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VillageManagement;
