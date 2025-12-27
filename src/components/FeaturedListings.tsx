import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import PropertyCard from "./PropertyCard";
import type { Property } from "../../shared/schema";
import { useState } from "react";
import { sampleProperties } from "../data";

export default function FeaturedListings() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const featuredProperties = sampleProperties || [];
  const visibleCount = 3;

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, featuredProperties.length - visibleCount)
        : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= featuredProperties.length - visibleCount ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg h-96" style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#fafafa' }} id="Featured">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#1a1a2e' }}>
            Featured <span style={{ color: '#d4af37' }}>Properties</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Handpicked exclusive listings from our premium collection
          </p>
        </motion.div>

        <div className="relative">
          {featuredProperties.length > visibleCount && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 left-0 -translate-y-1/2 backdrop-blur-lg hidden lg:flex shadow-lg transition-all hover:scale-110"
                onClick={handlePrevious}
                data-testid="button-carousel-prev"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#d4af37'
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 -translate-y-1/2 backdrop-blur-lg hidden lg:flex shadow-lg transition-all hover:scale-110"
                onClick={handleNext}
                data-testid="button-carousel-next"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#d4af37'
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-8"
            >
              {featuredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.33rem)]"
                >
                  <PropertyCard property={property} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {featuredProperties.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({
                length: Math.max(
                  1,
                  featuredProperties.length - visibleCount + 1
                ),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: currentIndex === index ? '#d4af37' : 'rgba(102, 102, 102, 0.3)',
                    width: currentIndex === index ? '32px' : '8px'
                  }}
                  data-testid={`button-carousel-dot-${index}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}