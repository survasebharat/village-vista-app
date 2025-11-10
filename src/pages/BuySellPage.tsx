import { useState } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, PlusCircle } from "lucide-react";
import ItemList from "@/components/marketplace/ItemList";
import PostItemForm from "@/components/marketplace/PostItemForm";

const BuySellPage = () => {
  usePageSEO({
    title: "Buy & Sell - Shivankhed Khurd Market",
    description: "Buy, sell, and exchange items in your village. Find farming tools, electronics, vehicles, animals, and more from local sellers.",
    keywords: ["buy", "sell", "marketplace", "village market", "OLX", "local sellers", "Shivankhed Khurd"],
    canonical: window.location.origin + "/buy-sell"
  });

  const [activeTab, setActiveTab] = useState("items");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Buy & Sell – Market
            </h1>
            <p className="text-sm text-muted-foreground">
              Buy, Sell and Exchange items in your village
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="items" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Items for Sale
            </TabsTrigger>
            <TabsTrigger value="post" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post an Item
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-0">
            <ItemList />
          </TabsContent>

          <TabsContent value="post" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <PostItemForm onSuccess={() => setActiveTab("items")} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuySellPage;
