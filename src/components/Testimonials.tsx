import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Testimonial } from "../../shared/schema";

const sampleTestimonials = [
  {
    id:1,
    name: "Vikas Kumar",
    role: "Real Estate Investor",
    content:
      "Working with Perfect Homes was an absolute pleasure. Their professionalism and market knowledge helped me find the perfect investment property. Highly recommended!",
    rating: 5,
    avatarUrl: null,
  },
  {
    id:2,
    name: "Anjali Mehta",
    role: "Homeowner",
    content:
      "The team at Perfect Homes went above and beyond to help us find our dream home. Their attention to detail and personalized service made all the difference.",
    rating: 5,
    avatarUrl: null,
  },
  {
    id:3,
    name: "Rajesh Singh",
    role: "Business Executive",
    content:
      "Exceptional service from start to finish. The property selection was outstanding, and the entire process was smooth and professional. I couldn't be happier with my purchase.",
    rating: 5,
    avatarUrl: null,
  },
  {
    id:4,
    name: "Priya Sharma",
    role: "Entrepreneur",
    content:
      "Perfect Homes truly understands luxury real estate. They found us exactly what we were looking for and handled every detail with care and expertise.",
    rating: 5,
    avatarUrl: null,
  },
  {
    id:5,
    name: "Amitabh Joshi",
    role: "Retired Executive",
    content:
      "Outstanding experience! The team's knowledge of the luxury market is unparalleled. They made finding our retirement home effortless and enjoyable.",
    rating: 5,
    avatarUrl: null,
  },
  {
    id:6,
    name: "Sunita Verma",
    role: "Doctor",
    content:
      "From our first meeting to closing, everything was handled professionally and efficiently. Perfect Homes's commitment to excellence truly shows in their work.",
    rating: 5,
    avatarUrl: null,
  },
];

export default function Testimonials() {
  const { isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg h-64" style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#1a1a2e' }}>
            Client <span style={{ color: '#d4af37' }}>Testimonials</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Hear what our satisfied clients have to say about their experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleTestimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <Card 
                className="p-6 backdrop-blur-lg h-full hover-elevate transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8" style={{ color: 'rgba(212, 175, 55, 0.4)' }} />
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        style={{ fill: '#d4af37', color: '#d4af37' }}
                      />
                    ))}
                  </div>
                </div>

                <p className="mb-6 italic" style={{ color: '#1a1a2e' }}>
                  "{testimonial.content}"
                </p>

                <div 
                  className="flex items-center gap-3 pt-4 border-t"
                  style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
                >
                  <Avatar>
                    <AvatarImage src={testimonial.avatarUrl || undefined} />
                    <AvatarFallback 
                      style={{ 
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        color: '#d4af37'
                      }}
                    >
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div 
                      className="font-semibold" 
                      style={{ color: '#1a1a2e' }}
                      data-testid={`text-name-${testimonial.id}`}
                    >
                      {testimonial.name}
                    </div>
                    <div className="text-sm" style={{ color: '#666666' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}