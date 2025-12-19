import { motion } from "framer-motion";
import { 
  // Bed, Bath, Square,
   MapPin } from "lucide-react";
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
      <Card className="group overflow-hidden border-white/20 bg-card/40 backdrop-blur-lg hover-elevate active-elevate-2 transition-all duration-300">
        <Link href={`/properties/${property.id}`}>
          <div className="relative overflow-hidden aspect-[4/3] cursor-pointer">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            
            {property.featured && (
              <Badge
                className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm border-white/20"
                data-testid={`badge-featured-${property.id}`}
              >
                Featured
              </Badge>
            )}

            <Badge
              className="absolute top-4 right-4 bg-card/60 backdrop-blur-sm border-white/20"
              data-testid={`badge-status-${property.id}`}
            >
              {property.status}
            </Badge>

            {/* <Button
              size="icon"
              variant="ghost"
              className="absolute bottom-4 right-4 bg-card/60 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid={`button-favorite-${property.id}`}
            >
              <Heart className="w-4 h-4" />
            </Button> */}

            <div className="absolute bottom-4 left-4">
              {/* <div className="text-3xl font-bold text-white font-serif">
                ${(property.price / 1000000).toFixed(2)}M
              </div> */}
              <div className="text-sm text-white/80 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {property.location}
              </div>
            </div>
          </div>
        </Link>

        <div className="p-6">
          <Link href={`/properties/${property.id}`}>
            <h3
              className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
              data-testid={`text-title-${property.id}`}
            >
              {property.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1" data-testid={`text-bedrooms-${property.id}`}>
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1" data-testid={`text-bathrooms-${property.id}`}>
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1" data-testid={`text-sqft-${property.id}`}>
              <Square className="w-4 h-4" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div> */}

          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              className="w-full"
              asChild
              data-testid={`button-view-details-${property.id}`}
            >
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
