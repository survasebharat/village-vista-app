import { useState, useContext, memo } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, Shield, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import SocialMediaButtons from "./SocialMediaButtons";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { supabase } from "@/integrations/supabase/client";
import { CUSTOM_ROUTES } from "@/custom-routes";
import { VillageContext } from "@/context/VillageContextConfig";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user, isAdmin, isSubAdmin } = useAuth();
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
    { name: "Notices", href: CUSTOM_ROUTES.NOTICES, pageKey: "notices" },
    { name: "Market Prices", href: CUSTOM_ROUTES.MARKET_PRICES, pageKey: "market_prices" },
    { name: "Buy & Sell", href: CUSTOM_ROUTES.BUY_SELL, pageKey: "buy_sell" },
    { name: "Forum", href: CUSTOM_ROUTES.FORUM, pageKey: "forum" },
    { name: "Pay Taxes", href: CUSTOM_ROUTES.TAX_PAYMENT, pageKey: "tax_payment" },
    { name: t("header.contact"), href: CUSTOM_ROUTES.CONTACT_US, pageKey: "contact" },
   //{ name: "", href: CUSTOM_ROUTES.PEOPLE, pageKey: "people" },

  ];

  // Filter navigation items based on visibility
  const navItems = allNavItems.filter((item) => isPageVisible(item.pageKey));

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo & Title */}
          <Link to={CUSTOM_ROUTES.HOME}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-sm">
                शि
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t("header.title")}
                </h1>
                {config?.village && (
                  <p className="text-sm text-muted-foreground">
                    {config.village.state} {config.village.district && ","} {config.village.district}
                  </p>
                )}
              </div>
            </div>
          </Link>

          {/* Left side: Language, Theme & Social */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <SocialMediaButtons social={config?.social} className="hidden lg:flex" />
          </div>

          {/* Desktop Navigation & Auth */}
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

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  {(isAdmin || isSubAdmin) ? (
                    <Button variant="outline" size="sm" onClick={() => navigate("/admin/dashboard")} className="gap-2">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => navigate(CUSTOM_ROUTES.USER_DASHBOARD)} className="gap-2">
                      <User className="h-4 w-4" />
                      My Profile
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="default" size="sm" onClick={() => navigate("/auth")} className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Rendered via Portal at document root */}
      {isMenuOpen && createPortal(
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-[9998] lg:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <nav className="fixed top-0 right-0 h-full w-64 bg-card shadow-2xl z-[9999] lg:hidden animate-slide-in-right overflow-y-auto border-l border-border">
            <div className="flex flex-col gap-2 p-4">
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
                    {(isAdmin || isSubAdmin) ? (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          navigate("/admin/dashboard");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          navigate(CUSTOM_ROUTES.USER_DASHBOARD);
                          setIsMenuOpen(false);
                        }}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Button>
                    )}
                    <Button variant="ghost" className="w-full gap-2" onClick={handleLogout}>
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

              {/* Mobile Social Media */}
              {config?.social && (
                <div className="flex justify-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <SocialMediaButtons social={config.social} className="flex" />
                  </div>
                </div>
              )}
            </div>
          </nav>
        </>,
        document.body
      )}
    </header>
  );
};

export default memo(Header);
