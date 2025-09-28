import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import villageData from "@/data/villageData.json";

const Footer = () => {
  const { village, contact } = villageData;
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Village", href: "#about" },
    { name: "Panchayat Members", href: "#panchayat" },
    { name: "Government Schemes", href: "#schemes" },
    { name: "Development Works", href: "#development" },
  ];

  const services = [
    { name: "Birth Certificate", href: "#contact" },
    { name: "Death Certificate", href: "#contact" },
    { name: "Property Tax", href: "#contact" },
    { name: "RTI Application", href: "#contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Village Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
                  हरी
                </div>
                <div>
                  <h3 className="text-xl font-bold">{village.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {village.state}, {village.district}
                  </p>
                </div>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed text-sm">
                A progressive village committed to sustainable development, 
                transparent governance, and inclusive growth for all residents.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary-foreground/70 flex-shrink-0" />
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  Gram Panchayat Office, {village.name}<br />
                  {village.district}, {village.state} - {village.pincode}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-foreground/70 flex-shrink-0" />
                <a
                  href={`tel:${contact.office.phone}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm"
                >
                  {contact.office.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-foreground/70 flex-shrink-0" />
                <a
                  href={`mailto:${contact.office.email}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm"
                >
                  {contact.office.email}
                </a>
              </div>

              {/* <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-primary-foreground/70 flex-shrink-0" />
                <a
                  href={`https://${contact.office.website}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.office.website}
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/70 text-sm">
              © {currentYear} {village.name}. All rights reserved.
            </p>
            <p className="text-primary-foreground/50 text-xs mt-1">
              Developed for transparent and efficient rural governance
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="#privacy"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#rti"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              RTI Guidelines
            </a>
          </div>
        </div>
      </div>

      {/* Government Links */}
      <div className="bg-primary-glow/20 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <span className="text-primary-foreground/60">Developed By:</span>
            <a href="https://www.linkedin.com/in/ramdas-bhingole-8333b127/" className="text-primary-foreground/70 hover:text-primary-foreground">
              @ramdasbhingole
            </a>
            <a href="https://pirajisurvase.vercel.app" className="text-primary-foreground/70 hover:text-primary-foreground">
              @pirajisurvase
            </a>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;