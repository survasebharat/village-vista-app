import { useState, useContext, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, Shield, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "@/hooks/useAuth";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { supabase } from "@/integrations/supabase/client";
import { CUSTOM_ROUTES } from "@/custom-routes";
import { VillageContext } from "@/context/VillageContextConfig";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();
  const { isPageVisible } = usePageVisibility();
  const navigate = useNavigate();
  const { config } = useContext(VillageContext);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  const allNavItems = [
    { name: t("header.about"), href: CUSTOM_ROUTES.ABOUT, pageKey: "about" },
    { name: t("header.services"), href: CUSTOM_ROUTES.SERVICES, pageKey: "services" },
    { name: t("header.panchayat"), href: CUSTOM_ROUTES.PANCHAYAT, pageKey: "panchayat" },
    { name: t("header.contact"), href: CUSTOM_ROUTES.CONTACT_US, pageKey: "contact" },
  ];

  // Filter navigation items based on visibility
  const navItems = allNavItems.filter(item => isPageVisible(item.pageKey));

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Info Bar */}
        {config && (
          <div className="hidden md:flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border/50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{config.contact.office.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{config.contact.office.email}</span>
              </div>
            </div>
            <div className="text-sm">
              {config.contact.office.hours}
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo & Title */}
          <Link to={CUSTOM_ROUTES.HOME} >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-sm">
              शि
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {config?.village.state} {config?.village.district && ","} {config?.village.district}
              </p>
            </div>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-primary/10"
                  asChild
                >
                   <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>
            <LanguageToggle />
            
            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/admin")}
                      className="gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Admin
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start text-foreground hover:text-primary hover:bg-primary/10"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="mt-4 space-y-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          navigate("/admin");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    className="w-full gap-2"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default memo(Header);