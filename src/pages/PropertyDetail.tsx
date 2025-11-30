import { useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  // ⭐ REPLACED API QUERY WITH LOCAL DATA LOOKUP
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

  // ⭐ LOADING STATE REMOVED — not needed now

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Property not found
          </h1>
          <Button asChild>
            <Link href="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = [property.imageUrl, property.imageUrl, property.imageUrl];

  return (
    <div className="min-h-screen pt-20">
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
          >
            <Link href="/properties">
              <ChevronLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card/40">
                <img
                  src={images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                {images.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-lg border border-white/20"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      data-testid="button-image-prev"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-lg border border-white/20"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      data-testid="button-image-next"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-card/80 backdrop-blur-lg border border-white/20"
                    data-testid="button-share"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-card/80 backdrop-blur-lg border border-white/20"
                    data-testid="button-favorite"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm mb-2">
                    {property.status}
                  </Badge>
                  <div className="text-4xl font-bold text-white font-serif">
                    ${(property.price / 1000000).toFixed(2)}M
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">
                      {property.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">
                      {property.bathrooms} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">
                      {property.squareFeet.toLocaleString()} sqft
                    </span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                    Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-foreground"
                      data-testid={`text-amenity-${index}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 bg-card/40 backdrop-blur-lg border-white/20 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Request Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="mb-2 block">
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
                      className="bg-card/60 backdrop-blur border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">
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
                      className="bg-card/60 backdrop-blur border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block">
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
                      className="bg-card/60 backdrop-blur border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-2 block">
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
                      className="bg-card/60 backdrop-blur border-white/20 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-inquiry"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+91-9711065465</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
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
