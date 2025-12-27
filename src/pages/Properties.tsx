/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../components/PropertyCard";
import type { Property } from "../../shared/schema";
import { sampleProperties } from "../data";

export default function Properties() {
  const [priceRange] = useState([0, 20000000]);
  const [selectedTypes] = useState<string[]>([]);
  const [selectedLocation] = useState("all");
  const [bedrooms] = useState("all");
  const [bathrooms] = useState("all");

  const { isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = sampleProperties?.filter((property) => {
    if (
      selectedTypes.length > 0 &&
      !selectedTypes.includes(property.propertyType)
    ) {
      return false;
    }
    if (
      selectedLocation &&
      selectedLocation !== "all" &&
      property.location !== selectedLocation
    ) {
      return false;
    }
    if (property.price < priceRange[0] || property.price > priceRange[1]) {
      return false;
    }
    if (
      bedrooms &&
      bedrooms !== "all" &&
      property.bedrooms < parseInt(bedrooms)
    ) {
      return false;
    }
    if (
      bathrooms &&
      bathrooms !== "all" &&
      property.bathrooms < parseInt(bathrooms)
    ) {
      return false;
    }
    return true;
  });

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
              Luxury <span style={{ color: '#d4af37' }}>Properties</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#e0e0e0' }}>
              Discover exceptional properties tailored to your lifestyle
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div 
                      className="rounded-lg h-96"
                      style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)' }}
                    />
                  </div>
                ))}
              </div>
            ) : filteredProperties && filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg" style={{ color: '#666666' }}>
                  No properties match your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}