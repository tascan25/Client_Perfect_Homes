import { useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import {
  MapPin,
  ChevronLeft,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import type { Property, InsertContactSubmission } from "../../shared/schema";
import { Link } from "wouter";
import { sampleProperties } from "../data";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const property: Property | undefined = sampleProperties.find(
    (p) => p.id === id
  );

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you shortly.",
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
    contactMutation.mutate({
      ...formData,
      propertyId: id,
    });
  };

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: '#fafafa' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            Property not found
          </h1>
          <Button asChild style={{ backgroundColor: '#d4af37', color: '#1a1a2e' }}>
            <Link href="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = [property.imageUrl, property.imageUrl, property.imageUrl];

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            asChild
            data-testid="button-back"
            style={{ color: '#1a1a2e' }}
          >
            <Link href="/properties">
              <ChevronLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden" style={{ backgroundColor: '#1a1a2e' }}>
                <img
                  src={images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(26, 26, 46, 0.6) 0%, transparent 60%)' }}
                />

                <div className="absolute bottom-4 left-4">
                  <Badge 
                    className="backdrop-blur-sm mb-2"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.95)', color: '#1a1a2e' }}
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: '#1a1a2e' }}>
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 mb-6" style={{ color: '#666666' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#1a1a2e' }}>
                    Description
                  </h2>
                  <p className="leading-relaxed" style={{ color: '#666666' }}>
                    {property.description}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#1a1a2e' }}>
                  Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                      style={{ color: '#1a1a2e' }}
                      data-testid={`text-amenity-${index}`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                      >
                        <Check className="w-4 h-4" style={{ color: '#d4af37' }} />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card 
                className="p-6 backdrop-blur-lg sticky top-24 shadow-xl"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1a1a2e' }}>
                  Request Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      required
                      data-testid="input-name"
                      className="backdrop-blur"
                      style={{ 
                        backgroundColor: 'rgba(250, 250, 250, 0.8)',
                        borderColor: 'rgba(212, 175, 55, 0.3)'
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                      className="backdrop-blur"
                      style={{ 
                        backgroundColor: 'rgba(250, 250, 250, 0.8)',
                        borderColor: 'rgba(212, 175, 55, 0.3)'
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(555) 123-4567"
                      data-testid="input-phone"
                      className="backdrop-blur"
                      style={{ 
                        backgroundColor: 'rgba(250, 250, 250, 0.8)',
                        borderColor: 'rgba(212, 175, 55, 0.3)'
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-2 block" style={{ color: '#1a1a2e' }}>
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="I'm interested in this property..."
                      required
                      rows={4}
                      data-testid="textarea-message"
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
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-inquiry"
                    style={{ 
                      backgroundColor: '#d4af37',
                      color: '#1a1a2e',
                      fontWeight: '600'
                    }}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>

                <div 
                  className="mt-6 pt-6 space-y-3"
                  style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
                >
                  <div className="flex items-center gap-3" style={{ color: '#666666' }}>
                    <Phone className="w-5 h-5" style={{ color: '#d4af37' }} />
                    <a href="tel:+91-9711065465">+91-9711065465</a>
                  </div>
                  <div className="flex items-center gap-3" style={{ color: '#666666' }}>
                    <Mail className="w-5 h-5" style={{ color: '#d4af37' }} />
                    <span className="cursor-pointer"><a href="mailto:Perfecthomesmk@gmail.com">Perfecthomesmk@gmail.com</a></span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}