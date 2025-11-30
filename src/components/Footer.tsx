import { Link } from "wouter";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "./ui/button";
// import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-card/40 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-serif font-bold text-foreground">
                Perfect Homes
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your trusted partner in finding the perfect luxury property.
              Excellence in every detail.
            </p>
            <div className="flex gap-2">
              <a href="www.google.com" target="_blank">
                <Button
                  size="icon"
                  variant="ghost"
                  className="border border-white/10"
                  data-testid="button-social-facebook"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>

              <a href="www.google.com" target="_blank">
                <Button
                  size="icon"
                  variant="ghost"
                  className="border border-white/10"
                  data-testid="button-social-instagram"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>

              <a href="www.google.com" target="_blank">
                <Button
                  size="icon"
                  variant="ghost"
                  className="border border-white/10"
                  data-testid="button-social-twitter"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
              </a>

              {/* <Button
                size="icon"
                variant="ghost"
                className="border border-white/10"
                data-testid="button-social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button> */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" data-testid="footer-link-home">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/properties" data-testid="footer-link-properties">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="footer-link-contact">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Property Types
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <Link href="/properties" data-testid="footer-link-properties">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Luxury Mansions
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Penthouses
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Waterfront Villas
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Estate Properties
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Luxury Condos
                </li>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  Sector-91, Surya Nagar, Faridabad-121013, Haryana, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="tel:+919711065465"><span>+91-9711065465</span></a>
                <a href="tel:+919717978778"><span>+91-9717978778</span></a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="mailto:Perfecthomesmk@gmail.com"><span>Perfecthomesmk@gmail.com</span></a>
              </li>
            </ul>

            {/* <div className="mt-6">
              <h4 className="font-medium text-foreground mb-2 text-sm">
                Newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-card/60 backdrop-blur border-white/20"
                  data-testid="input-newsletter"
                />
                <Button variant="default" data-testid="button-subscribe">
                  Subscribe
                </Button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} PerfectHomes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
