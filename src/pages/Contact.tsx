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

  // const team = [
  //   {
  //     name: "Sarah Johnson",
  //     role: "Senior Real Estate Agent",
  //     initials: "SJ",
  //   },
  //   {
  //     name: "Michael Chen",
  //     role: "Luxury Property Specialist",
  //     initials: "MC",
  //   },
  //   {
  //     name: "Emily Rodriguez",
  //     role: "Client Relations Manager",
  //     initials: "ER",
  //   },
  //   {
  //     name: "David Thompson",
  //     role: "Investment Advisor",
  //     initials: "DT",
  //   },
  // ];

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Contact Information
            </h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form and our team will get back to you within 24
              hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Address
                  </h3>
                  <a href="https://www.google.com/maps/search/61+GF,+Sector-91,+Surya+Nagar,+Phase-2,+Faridabad-121013,+Haryana,+India/@28.4761894,77.3270563,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                  target="_blank"><p className="text-muted-foreground">
                     61 GF, Surya Nagar, Sector-91, Phase-2, Faridabad-121013, Haryana, India
                  </p></a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a href="tel:+919711065465"><p className="text-muted-foreground">+91-9711065465</p></a>
                  <a href="tel:+919717978778"><p className="text-muted-foreground">+91-9717978778</p></a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:Perfecthomesmk@gmail.com"><p className="text-muted-foreground">Perfecthomesmk@gmail.com</p></a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: By Appointment
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
            <Card className="p-8 bg-card/40 backdrop-blur-lg border-white/20">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="contact-name" className="mb-2 block">
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
                    className="bg-card/60 backdrop-blur border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email" className="mb-2 block">
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
                    className="bg-card/60 backdrop-blur border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-phone" className="mb-2 block">
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
                    className="bg-card/60 backdrop-blur border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message" className="mb-2 block">
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
                    className="bg-card/60 backdrop-blur border-white/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our experienced professionals are dedicated to helping you find your
            perfect property
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                data-testid={`card-team-${index}`}
              >
                <Card className="p-6 bg-card/40 backdrop-blur-lg border-white/20 text-center hover-elevate transition-all duration-300">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card className="p-12 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl border-white/20 text-center">
            <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              About Perfect Homes
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              For over 25 years, LuxeEstate has been the premier destination for
              luxury real estate. We specialize in exceptional properties and
              provide unparalleled service to our discerning clients. Our
              commitment to excellence and deep market expertise ensures you'll
              find the perfect property to match your lifestyle and investment
              goals.
            </p>
            <div className="flex flex-wrap justify-center gap-12 mt-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  2.5K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Properties Sold
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">
                  Active Listings
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">
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
