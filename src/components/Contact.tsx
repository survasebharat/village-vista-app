import { MapPin, Phone, Mail, Clock, MessageSquare, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import villageData from "@/data/villageData.json";

const Contact = () => {
  const { contact } = villageData;
  const { t } = useTranslation();

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
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-lift transition-all duration-300 animate-fade-in">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('contact.phone2')}</p>
                      <p className="text-muted-foreground">{contact.office.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('contact.email2')}</p>
                      <p className="text-muted-foreground">{contact.office.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('contact.officeHours')}</p>
                      <p className="text-muted-foreground">{contact.office.hours}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full transition-all duration-300 hover:scale-[1.02] animate-fade-in" size="lg" style={{ animationDelay: "300ms" }}>
                  <MapPin className="h-5 w-5 mr-2" />
                  {t('contact.getDirections')}
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
                  <div className="text-center p-4 rounded-lg bg-destructive/5 border border-destructive/20 hover-lift transition-all duration-300 animate-fade-in">
                    <p className="text-3xl mb-2">🚔</p>
                    <p className="font-semibold">{t('contact.police')}</p>
                    <p className="text-destructive font-mono text-lg">{contact.emergency.police}</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/20 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <p className="text-3xl mb-2">🚒</p>
                    <p className="font-semibold">{t('contact.fire')}</p>
                    <p className="text-warning font-mono text-lg">{contact.emergency.fire}</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <p className="text-3xl mb-2">🚑</p>
                    <p className="font-semibold">{t('contact.ambulance')}</p>
                    <p className="text-success font-mono text-lg">{contact.emergency.ambulance}</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
                    <p className="text-3xl mb-2">📞</p>
                    <p className="font-semibold">{t('contact.localEmergency')}</p>
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
                  <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t('contact.name')}</label>
                      <Input placeholder={t('contact.enterName')} className="transition-all duration-300 focus:scale-[1.02]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t('contact.phone')}</label>
                      <Input placeholder={t('contact.enterPhone')} className="transition-all duration-300 focus:scale-[1.02]" />
                    </div>
                  </div>

                  <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <label className="text-sm font-medium mb-2 block">{t('contact.email')}</label>
                    <Input type="email" placeholder={t('contact.enterEmail')} className="transition-all duration-300 focus:scale-[1.02]" />
                  </div>

                  <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <label className="text-sm font-medium mb-2 block">{t('contact.subject')}</label>
                    <Input placeholder={t('contact.enterSubject')} className="transition-all duration-300 focus:scale-[1.02]" />
                  </div>

                  <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                    <label className="text-sm font-medium mb-2 block">{t('contact.message')}</label>
                    <Textarea 
                      placeholder={t('contact.enterMessage')} 
                      className="min-h-[120px] transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <Button className="w-full transition-all duration-300 hover:scale-[1.02] animate-fade-in" size="lg" style={{ animationDelay: "400ms" }}>
                    {t('contact.submit')}
                  </Button>
                </form>

                <div className="p-4 rounded-lg bg-muted/30 border border-border animate-fade-in" style={{ animationDelay: "500ms" }}>
                  <p className="text-sm text-muted-foreground text-center">
                    💡 {t('contact.urgentNote')}
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