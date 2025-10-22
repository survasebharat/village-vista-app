import { useState, useEffect, useContext } from 'react';
import { TrendingUp, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { usePageSEO } from '@/hooks/usePageSEO';
import SectionSkeleton from '@/components/ui/skeletons/SectionSkeleton';
import { VillageContext } from '@/context/VillageContextConfig';

interface MarketPrice {
  id: string;
  crop_name: string;
  price: number;
  unit: string;
  last_updated: string;
}

const MarketPricesPage = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { config } = useContext(VillageContext);

  usePageSEO({
    title: `Market Prices - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Current agricultural market prices in ${config?.village.name || 'Village'}. Stay updated with crop rates.`,
    keywords: ['market prices', 'crop prices', 'agriculture', 'farming', 'commodity prices'],
  });

  useEffect(() => {
    loadPrices();
  }, [config]);

  const loadPrices = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('crop_name', { ascending: true });

      if (error) throw error;
      setPrices(data || []);
    } catch (error) {
      console.error('Error loading market prices:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLatestUpdate = () => {
    if (prices.length === 0) return null;
    const latest = prices.reduce((prev, current) =>
      new Date(current.last_updated) > new Date(prev.last_updated) ? current : prev
    );
    return formatDate(latest.last_updated);
  };

  if (loading) return <SectionSkeleton />;

  return (
    <section className="py-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-gradient">
              Market Prices
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time agricultural commodity prices for farmers
          </p>
          {getLatestUpdate() && (
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: {getLatestUpdate()}
            </p>
          )}
        </div>

        {/* Prices Card */}
        <Card className="card-elegant animate-fade-in max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Crop Prices Today</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPrices(true)}
                disabled={refreshing}
              >
                {refreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {prices.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Prices Available</h3>
                <p className="text-muted-foreground">
                  Market price data will be displayed here once available.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Crop Name</TableHead>
                      <TableHead className="font-bold text-right">Price</TableHead>
                      <TableHead className="font-bold">Unit</TableHead>
                      <TableHead className="font-bold">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prices.map((price) => (
                      <TableRow key={price.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{price.crop_name}</TableCell>
                        <TableCell className="text-right text-lg font-semibold text-primary">
                          ₹{price.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          per {price.unit}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(price.last_updated)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-primary/10 rounded-lg text-sm text-muted-foreground text-center">
          <p>
            Prices are indicative and may vary based on quality and market conditions.
            Please verify with local traders for exact rates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketPricesPage;
