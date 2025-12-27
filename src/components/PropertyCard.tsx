import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "wouter";
import type { Property } from "../../shared/schema";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-testid={`card-property-${property.id}`}
    >
      <Card 
        className="group overflow-hidden backdrop-blur-lg hover-elevate active-elevate-2 transition-all duration-300 shadow-lg"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}
      >
        <Link href={`/properties/${property.id}`}>
          <div className="relative overflow-hidden aspect-[4/3] cursor-pointer">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(26, 26, 46, 0.8) 0%, rgba(26, 26, 46, 0.2) 40%, transparent 100%)'
              }}
            />
            
            {property.featured && (
              <Badge
                className="absolute top-4 left-4 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.95)',
                  color: '#1a1a2e',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                data-testid={`badge-featured-${property.id}`}
              >
                Featured
              </Badge>
            )}

            <Badge
              className="absolute top-4 right-4 backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#1a1a2e',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
              data-testid={`badge-status-${property.id}`}
            >
              {property.status}
            </Badge>

            <div className="absolute bottom-4 left-4">
              <div className="text-sm flex items-center gap-1 mt-1" style={{ color: '#ffffff' }}>
                <MapPin className="w-3 h-3" />
                {property.location}
              </div>
            </div>
          </div>
        </Link>

        <div className="p-6">
          <Link href={`/properties/${property.id}`}>
            <h3
              className="text-xl font-semibold mb-2 transition-colors cursor-pointer line-clamp-1"
              style={{ color: '#1a1a2e' }}
              data-testid={`text-title-${property.id}`}
            >
              {property.title}
            </h3>
          </Link>
          <p className="text-sm mb-4 line-clamp-2" style={{ color: '#666666' }}>
            {property.description}
          </p>

          <div 
            className="mt-4 pt-4"
            style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
          >
            <Button
              variant="outline"
              className="w-full transition-all hover:scale-105"
              asChild
              data-testid={`button-view-details-${property.id}`}
              style={{
                backgroundColor: '#d4af37',
                color: '#1a1a2e',
                fontWeight: '600',
                border: 'none'
              }}
            >
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}