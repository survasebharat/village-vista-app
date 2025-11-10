import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Package, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";
import { usePageSEO } from "@/hooks/usePageSEO";
import CustomLoader from "@/components/CustomLoader";

interface SellerItem {
  id: string;
  item_name: string;
  category: string;
  price: number;
  description: string;
  village: string;
  contact: string;
  seller_name: string;
  image_urls: string[];
  created_at: string;
  status: string;
  sold: boolean;
}

export default function SellerDashboard() {
  usePageSEO({
    title: "Seller Dashboard - Manage Your Listings",
    description: "View and manage your marketplace listings, track approval status, and mark items as sold.",
    keywords: ["seller dashboard", "my items", "marketplace", "listings"],
    canonical: window.location.origin + "/seller-dashboard"
  });

  const [items, setItems] = useState<SellerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellerName] = useState("Dinesh"); // Demo seller name

  useEffect(() => {
    fetchSellerItems();
  }, []);

  const fetchSellerItems = async () => {
    try {
      // For demo purposes, filter by seller_name
      // In production, use user_id with authentication
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("seller_name", sellerName)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load your items");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSold = async (itemId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("items")
        .update({ sold: !currentStatus })
        .eq("id", itemId);

      if (error) throw error;
      toast.success(!currentStatus ? "Item marked as sold" : "Item marked as available");
      fetchSellerItems();
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  };

  const getStatusBadge = (status: string, sold: boolean) => {
    if (sold) {
      return <Badge variant="secondary" className="bg-gray-500">Sold</Badge>;
    }
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const stats = {
    total: items.length,
    approved: items.filter(item => item.status === "approved" && !item.sold).length,
    pending: items.filter(item => item.status === "pending").length,
    sold: items.filter(item => item.sold).length,
    totalValue: items
      .filter(item => item.status === "approved" && !item.sold)
      .reduce((sum, item) => sum + Number(item.price), 0),
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Seller Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your listings and track their status
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Package className="h-4 w-4 mr-1" />
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <XCircle className="h-4 w-4 mr-1" />
                Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-600">{stats.sold}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Active Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{stats.totalValue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
          {items.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                You haven't posted any items yet.
              </CardContent>
            </Card>
          ) : (
            items.map((item) => (
              <Card key={item.id}>
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
                        {getStatusBadge(item.status, item.sold)}
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">₹{item.price}</span>
                        <span>•</span>
                        <span>{item.village}</span>
                        <span>•</span>
                        <span>Posted: {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {item.status === "approved" && (
                        <Button
                          size="sm"
                          variant={item.sold ? "outline" : "default"}
                          onClick={() => handleMarkAsSold(item.id, item.sold)}
                        >
                          {item.sold ? "Mark Available" : "Mark as Sold"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
