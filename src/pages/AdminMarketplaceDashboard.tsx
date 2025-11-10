import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, XCircle, Trash2, TrendingUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import CustomLoader from "@/components/CustomLoader";

interface Item {
  id: string;
  item_name: string;
  category: string;
  price: number;
  description: string;
  village: string;
  contact: string;
  image_urls: string[];
  created_at: string;
  status: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

export default function AdminMarketplaceDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
      return;
    }
    if (isAdmin) {
      fetchItems();
    }
  }, [isAdmin, authLoading, navigate]);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("items")
        .update({
          status: "approved",
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq("id", itemId);

      if (error) throw error;
      toast.success("Item approved successfully");
      fetchItems();
    } catch (error) {
      console.error("Error approving item:", error);
      toast.error("Failed to approve item");
    }
  };

  const handleReject = async () => {
    if (!selectedItem || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      const { error } = await supabase
        .from("items")
        .update({
          status: "rejected",
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          rejection_reason: rejectionReason,
        })
        .eq("id", selectedItem.id);

      if (error) throw error;
      toast.success("Item rejected");
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedItem(null);
      fetchItems();
    } catch (error) {
      console.error("Error rejecting item:", error);
      toast.error("Failed to reject item");
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.from("items").delete().eq("id", itemId);

      if (error) throw error;
      toast.success("Item deleted successfully");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const openRejectDialog = (item: Item) => {
    setSelectedItem(item);
    setShowRejectDialog(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const pendingItems = items.filter((item) => item.status === "pending");
  const approvedItems = items.filter((item) => item.status === "approved");
  const rejectedItems = items.filter((item) => item.status === "rejected");

  const analytics = {
    total: items.length,
    pending: pendingItems.length,
    approved: approvedItems.length,
    rejected: rejectedItems.length,
    totalValue: items
      .filter((item) => item.status === "approved")
      .reduce((sum, item) => sum + Number(item.price), 0),
  };

  if (authLoading || loading) {
    return <CustomLoader />;
  }

  const ItemCard = ({ item }: { item: Item }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {item.image_urls[0] && (
            <img
              src={item.image_urls[0]}
              alt={item.item_name}
              className="w-24 h-24 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{item.item_name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              {getStatusBadge(item.status)}
            </div>
            <p className="text-sm mb-2">{item.description}</p>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>₹{item.price}</span>
              <span>•</span>
              <span>{item.village}</span>
              <span>•</span>
              <span>{item.contact}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Posted: {new Date(item.created_at).toLocaleDateString()}
            </p>
            {item.rejection_reason && (
              <p className="text-sm text-destructive mt-2">
                Reason: {item.rejection_reason}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {item.status === "pending" && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleApprove(item.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => openRejectDialog(item)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
        <h1 className="text-3xl font-bold">Marketplace Management</h1>
        <p className="text-muted-foreground">Review and manage marketplace listings</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{analytics.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{analytics.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{analytics.rejected}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{analytics.totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different statuses */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingItems.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedItems.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {pendingItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No pending items
            </p>
          ) : (
            pendingItems.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          {approvedItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No approved items
            </p>
          ) : (
            approvedItems.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          {rejectedItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No rejected items
            </p>
          ) : (
            rejectedItems.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Item</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please provide a reason for rejecting "{selectedItem?.item_name}"
            </p>
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason("");
                setSelectedItem(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
