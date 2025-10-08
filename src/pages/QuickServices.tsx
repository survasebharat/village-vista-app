import { useState } from "react";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ServiceForm {
  applicant_name: string;
  father_mother_name: string;
  date_of_birth: string;
  address: string;
  mobile_number: string;
  email: string;
}

const QuickServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState<ServiceForm>({
    applicant_name: "",
    father_mother_name: "",
    date_of_birth: "",
    address: "",
    mobile_number: "",
    email: "",
  });

  const services = [
    {
      id: "birth-certificate",
      name: "Birth Certificate",
      description: "Apply for a new birth certificate",
      icon: FileText,
    },
    {
      id: "income-certificate",
      name: "Income Certificate",
      description: "Apply for income certificate",
      icon: FileText,
    },
    {
      id: "water-connection",
      name: "Water Connection",
      description: "Apply for new water connection",
      icon: FileText,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("quick_service_submissions")
      .insert({
        service_type: selectedService,
        applicant_name: formData.applicant_name,
        father_mother_name: formData.father_mother_name,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        mobile_number: formData.mobile_number,
        email: formData.email || null,
      });

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      });
      setFormData({
        applicant_name: "",
        father_mother_name: "",
        date_of_birth: "",
        address: "",
        mobile_number: "",
        email: "",
      });
      setSelectedService(null);
    }
  };

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
            <h1 className="text-4xl font-bold mb-4 text-gradient">Quick Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Apply for government services online - quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <Dialog key={service.id}>
                <DialogTrigger asChild>
                  <Card className="card-elegant hover-lift cursor-pointer">
                    <CardHeader>
                      <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-center">{service.name}</CardTitle>
                      <CardDescription className="text-center">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={() => setSelectedService(service.id)}>
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{service.name} Application</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicant_name">Applicant Name *</Label>
                      <Input
                        id="applicant_name"
                        required
                        value={formData.applicant_name}
                        onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="father_mother_name">Father/Mother Name *</Label>
                      <Input
                        id="father_mother_name"
                        required
                        value={formData.father_mother_name}
                        onChange={(e) => setFormData({ ...formData, father_mother_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth *</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        required
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile_number">Mobile Number *</Label>
                      <Input
                        id="mobile_number"
                        type="tel"
                        required
                        value={formData.mobile_number}
                        onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      <Send className="h-4 w-4 mr-2" />
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default QuickServices;
