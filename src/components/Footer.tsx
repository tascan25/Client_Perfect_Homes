import { Link } from "wouter";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer 
      className="backdrop-blur-xl border-t"
      style={{ 
        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.97) 0%, rgba(26, 26, 46, 0.95) 100%)',
        borderColor: 'rgba(212, 175, 55, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8960b 100%)' }}
              >
                <Building2 className="w-6 h-6" style={{ color: '#1a1a2e' }} />
              </div>
              <span className="text-2xl font-serif font-bold" style={{ color: '#ffffff' }}>
                Perfect Homes
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: '#cccccc' }}>
              Your trusted partner in finding the perfect luxury property.
              Excellence in every detail.
            </p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/share/1FoF9egc7T/" target="_blank">
                <Button
                  size="icon"
                  variant="ghost"
                  className="transition-all hover:scale-110"
                  data-testid="button-social-facebook"
                  style={{ 
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37'
                  }}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>

              <a href="https://www.instagram.com/perfecthomesmk?igsh=MWEzcWpyNDZtbThpMw==" target="_blank" className="cursor-pointer">
                <Button
                  size="icon"
                  variant="ghost"
                  className="transition-all hover:scale-110"
                  data-testid="button-social-instagram"
                  style={{ 
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37'
                  }}
                >
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>

              <a href="https://www.youtube.com/" target="_blank" className="cursor-pointer">
                <Button
                  size="icon"
                  variant="ghost"
                  className="transition-all hover:scale-110"
                  data-testid="button-social-twitter"
                  style={{ 
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37'
                  }}
                >
                  <Youtube className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" data-testid="footer-link-home">
                  <span className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/properties" data-testid="footer-link-properties">
                  <span className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                    Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="footer-link-contact">
                  <span className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#ffffff' }}>
              Property Types
            </h3>
            <ul className="space-y-2 text-sm">
              <Link href="/properties" data-testid="footer-link-properties">
                <li className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                  Luxury Mansions
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                  Penthouses
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                  Waterfront Villas
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                  Estate Properties
                </li>
              </Link>

              <Link href="/properties" data-testid="footer-link-properties">
                <li className="transition-colors cursor-pointer" style={{ color: '#cccccc' }}>
                  Luxury Condos
                </li>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Contact Info</h3>
            <ul className="space-y-3 text-sm" style={{ color: '#cccccc' }}>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#d4af37' }} />
                <a href="https://www.google.com/maps/search/61+GF,+Sector-91,+Surya+Nagar,+Phase-2,+Faridabad-121013,+Haryana,+India/@28.4761894,77.3270563,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                target="_blank"><span>
                   61 GF, Sector-91, Surya Nagar, Phase-2, Faridabad-121013, Haryana, India
                </span></a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <a href="tel:+919711065465"><span>+91-9711065465</span></a>
                <a href="tel:+919717978778"><span>+91-9717978778</span></a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <a href="mailto:Perfecthomesmk@gmail.com"><span>Perfecthomesmk@gmail.com</span></a>
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="ml-2">Mon-Sun: 10:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div 
          className="pt-8 border-t text-center text-sm"
          style={{ 
            borderColor: 'rgba(212, 175, 55, 0.2)',
            color: '#cccccc'
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} PerfectHomes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}