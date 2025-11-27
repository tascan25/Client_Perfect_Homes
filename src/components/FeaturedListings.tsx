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

  const { data: properties, isLoading } = useQuery<Property[]>({
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
      <section className="py-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card/40 rounded-lg h-96" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 lg:px-8 bg-background" id="Featured">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Featured <span className="text-primary">Properties</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked exclusive listings from our premium collection
          </p>
        </motion.div>

        {/* MAIN CAROUSEL WRAPPER */}
        <div className="relative">

          {/* ====== BUTTONS AT THE TOP LEFT/RIGHT OF THE CAROUSEL ====== */}
          {featuredProperties.length > visibleCount && (
            <>
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 left-0 -translate-y-1/2
                bg-card/80 backdrop-blur-lg border border-white/20 hidden lg:flex shadow-lg"
                onClick={handlePrevious}
                data-testid="button-carousel-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 -translate-y-1/2
                bg-card/80 backdrop-blur-lg border border-white/20 hidden lg:flex shadow-lg"
                onClick={handleNext}
                data-testid="button-carousel-next"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
          {/* =========================================================== */}

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
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
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
