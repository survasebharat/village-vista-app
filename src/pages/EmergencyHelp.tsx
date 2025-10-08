import { useState, useEffect } from "react";
import { Phone, ArrowLeft, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface EmergencyContact {
  id: string;
  category: string;
  name: string;
  number: string;
  description: string;
  display_order: number;
}

const EmergencyHelp = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("emergency_contacts")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  };

  const groupedContacts = contacts.reduce((acc, contact) => {
    if (!acc[contact.category]) {
      acc[contact.category] = [];
    }
    acc[contact.category].push(contact);
    return acc;
  }, {} as Record<string, EmergencyContact[]>);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="h-10 w-10 text-destructive" />
              <h1 className="text-4xl font-bold text-gradient">Emergency Help</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Important contact numbers for emergency services and helplines
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading contacts...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {Object.entries(groupedContacts).map(([category, categoryContacts]) => (
                <Card key={category} className="card-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {categoryContacts.map((contact) => (
                      <div key={contact.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{contact.name}</h3>
                            {contact.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {contact.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-primary font-medium">
                              <Phone className="h-4 w-4" />
                              <a href={`tel:${contact.number}`} className="hover:underline">
                                {contact.number}
                              </a>
                            </div>
                          </div>
                          <Button asChild size="sm" variant="default">
                            <a href={`tel:${contact.number}`}>Call</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EmergencyHelp;
