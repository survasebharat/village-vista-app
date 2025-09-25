import { MapPin, Phone, Mail, Clock, MessageSquare, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import villageData from "@/data/villageData.json";

const Contact = () => {
  const { contact } = villageData;

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get in touch with your Gram Panchayat for any queries, complaints, 
            or assistance with government services and village development matters.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            {/* Office Information */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  Panchayat Office
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground leading-relaxed">
                    {contact.office.address}
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{contact.office.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{contact.office.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground">{contact.office.hours}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-3xl mb-2">🚔</p>
                    <p className="font-semibold">Police</p>
                    <p className="text-destructive font-mono text-lg">{contact.emergency.police}</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <p className="text-3xl mb-2">🚒</p>
                    <p className="font-semibold">Fire</p>
                    <p className="text-warning font-mono text-lg">{contact.emergency.fire}</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20">
                    <p className="text-3xl mb-2">🚑</p>
                    <p className="font-semibold">Ambulance</p>
                    <p className="text-success font-mono text-lg">{contact.emergency.ambulance}</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="text-3xl mb-2">📞</p>
                    <p className="font-semibold">Local Emergency</p>
                    <p className="text-accent font-mono text-sm">{contact.emergency.local_emergency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input placeholder="Enter your phone number" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="What is this regarding?" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      placeholder="Please describe your query, complaint, or suggestion in detail..." 
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>

                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    💡 For urgent matters, please call our office directly. 
                    We aim to respond to all messages within 2-3 business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Services */}
            <Card className="card-elegant mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <FileText className="h-5 w-5 text-primary" />
                  Quick Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {[
                    "Birth Certificate Application",
                    "Death Certificate Application", 
                    "Property Tax Payment",
                    "RTI Application",
                    "Complaint Registration"
                  ].map((service, index) => (
                    <div 
                      key={service}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover-lift cursor-pointer"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-sm font-medium">{service}</span>
                      <Badge variant="outline" className="text-xs">
                        Apply
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;