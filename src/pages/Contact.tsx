import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import type { InsertContactSubmission } from "../../shared/schema";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#fafafa' }}>
      <div 
        className="backdrop-blur-xl border-b" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.85) 100%)',
          borderColor: 'rgba(212, 175, 55, 0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#ffffff' }}>
              Get in <span style={{ color: '#d4af37' }}>Touch</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#e0e0e0' }}>
              Ready to find your dream property? Our team is here to help you
              every step of the way
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-6" style={{ color: '#1a1a2e' }}>
              Contact Information
            </h2>
            <p className="mb-8" style={{ color: '#666666' }}>
              Fill out the form and our team will get back to you within 24
              hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  <MapPin className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1a1a2e' }}>
                    Address
                  </h3>
                  <a 
                    href="https://www.google.com/maps/search/61+GF,+Sector-91,+Surya+Nagar,+Phase-2,+Faridabad-121013,+Haryana,+India/@28.4761894,77.3270563,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                    target="_blank"
                    style={{ color: '#666666' }}
                    className="hover:underline"
                  >
                    <p>
                      61 GF, Surya Nagar, Sector-91, Phase-2, Faridabad-121013, Haryana, India
                    </p>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  <Phone className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1a1a2e' }}>Phone</h3>
                  <a href="tel:+919711065465" style={{ color: '#666666' }} className="hover:underline block">
                    <p>+91-9711065465</p>
                  </a>
                  <a href="tel:+919717978778" style={{ color: '#666666' }} className="hover:underline block">
                    <p>+91-9717978778</p>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  <Mail className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1a1a2e' }}>Email</h3>
                  <a href="mailto:Perfecthomesmk@gmail.com" style={{ color: '#666666' }} className="hover:underline">
                    <p>Perfecthomesmk@gmail.com</p>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  <Clock className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1a1a2e' }}>Hours</h3>
                  <p style={{ color: '#666666' }}>
                    Monday - Sunday: 10:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card 
              className="p-8 backdrop-blur-lg shadow-xl"
              style={{ 
                backgroundColor: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#1a1a2e' }}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="contact-name" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                    Name *
                  </Label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    required
                    data-testid="input-contact-name"
                    className="backdrop-blur"
                    style={{ 
                      backgroundColor: 'rgba(250, 250, 250, 0.8)',
                      borderColor: 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                    Email *
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    required
                    data-testid="input-contact-email"
                    className="backdrop-blur"
                    style={{ 
                      backgroundColor: 'rgba(250, 250, 250, 0.8)',
                      borderColor: 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-phone" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                    Phone
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(555) 123-4567"
                    data-testid="input-contact-phone"
                    className="backdrop-blur"
                    style={{ 
                      backgroundColor: 'rgba(250, 250, 250, 0.8)',
                      borderColor: 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                    Message *
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your property needs..."
                    required
                    rows={6}
                    data-testid="textarea-contact-message"
                    className="backdrop-blur resize-none"
                    style={{ 
                      backgroundColor: 'rgba(250, 250, 250, 0.8)',
                      borderColor: 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all hover:scale-105"
                  size="lg"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                  style={{ 
                    backgroundColor: '#d4af37',
                    color: '#1a1a2e',
                    fontWeight: '600'
                  }}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card 
            className="p-12 backdrop-blur-xl text-center shadow-xl flex flex-col justify-center items-center"
            style={{ 
              background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.97) 0%, rgba(26, 26, 46, 0.93) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            <Building2 className="w-16 h-16 mx-auto mb-6" style={{ color: '#d4af37' }} />
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: '#ffffff' }}>
              About Perfect Homes
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-6" style={{ color: '#e0e0e0' }}>
              For over 25 years, Perfect Homes has been the premier destination for
              luxury real estate. We specialize in exceptional properties and
              provide unparalleled service to our discerning clients. Our
              commitment to excellence and deep market expertise ensures you'll
              find the perfect property to match your lifestyle and investment
              goals.
            </p>
            <div className="w-[50vw] bg-transparent my-4 flex flex-col justify-center items-center gap-4">
              <span className="text-[#d4af37] text-xl md:text-2xlfont-serif font-semibold italic">Meet our Founder ~ Manjor Kumar</span>
              <div className="rounded-4xl">
                   <img src="/ownerimage.jpeg" alt="owner'simage"  className="object-contain rounded-4xl z-20 shadow-amber-300 w-[60vw] h-[60vh]"/>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 mt-8">
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#d4af37' }}>
                  2.5K+
                </div>
                <div className="text-sm" style={{ color: '#cccccc' }}>
                  Properties Sold
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#d4af37' }}>500+</div>
                <div className="text-sm" style={{ color: '#cccccc' }}>
                  Active Listings
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#d4af37' }}>25+</div>
                <div className="text-sm" style={{ color: '#cccccc' }}>
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#d4af37' }}>98%</div>
                <div className="text-sm" style={{ color: '#cccccc' }}>
                  Client Satisfaction
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
