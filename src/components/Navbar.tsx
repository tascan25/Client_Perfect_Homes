import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Building2, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/properties", label: "Properties", icon: Building2 },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl border-b shadow-xl"
            : "bg-transparent"
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(26, 26, 46, 0.9)' : 'transparent',
          borderColor: isScrolled ? 'rgba(212, 175, 55, 0.2)' : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" data-testid="link-home">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center"
                >
                  {/* <Building2 className="w-6 h-6" style={{ color: '#1a1a2e' }} /> */}
                  <img src="/logo.png" alt="Logo" className="" />
                </div>
                <span className="text-2xl font-serif font-bold text-slate-300 ">
                  Perfect Homes
                </span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center justify-between gap-16">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-base font-medium transition-colors cursor-pointer"
                    style={{
                      color: location === link.href ? '#d4af37' : 'var(--color-slate-300)'
                    }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="default"
                data-testid="button-phone"
                className="gap-2"
                style={{ color: 'var(--color-slate-300)' }}
              >
                <Phone className="w-4 h-4" />
                <a href="tel:+919711065465"><span>+91-9711065465</span></a>
              </Button>
              <Button
                variant="default"
                size="default"
                data-testid="button-schedule"
                asChild
                style={{ 
                  backgroundColor: '#d4af37',
                  color: '#1a1a2e',
                  fontWeight: '600'
                }}
              >
                <Link href="/contact">Schedule Viewing</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
              style={{ color: '#ffffff' }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden backdrop-blur-2xl"
            data-testid="mobile-menu"
            style={{ backgroundColor: 'rgba(26, 26, 46, 0.98)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    data-testid={`mobile-link-${link.label.toLowerCase()}`}
                  >
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-medium flex items-center gap-3"
                      style={{
                        color: location === link.href ? '#d4af37' : '#ffffff'
                      }}
                    >
                      <link.icon className="w-6 h-6" />
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 w-full max-w-xs mt-8"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full gap-2"
                  data-testid="mobile-button-phone"
                  style={{ color: '#ffffff' }}
                >
                  <Phone className="w-5 h-5" />
                  <span>+91-9711065465</span>
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  data-testid="mobile-button-schedule"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    backgroundColor: '#d4af37',
                    color: '#1a1a2e',
                    fontWeight: '600'
                  }}
                >
                  <Link href="/contact">Schedule Viewing</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}