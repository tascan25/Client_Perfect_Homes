/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
// import { SlidersHorizontal, X } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Slider } from "../components/ui/slider";
// import { Checkbox } from "../components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";
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

  // const propertyTypes = [
  //   "Mansion",
  //   "Penthouse",
  //   "Villa",
  //   "Estate",
  //   "Luxury Condo",
  // ];
  // const locations = [
  //   "Beverly Hills",
  //   "Malibu",
  //   "Manhattan",
  //   "Miami Beach",
  //   "Aspen",
  // ];

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

  // const handleTypeToggle = (type: string) => {
  //   setSelectedTypes((prev) =>
  //     prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
  //   );
  // };

  // const clearFilters = () => {
  //   setPriceRange([0, 20000000]);
  //   setSelectedTypes([]);
  //   setSelectedLocation("all");
  //   setBedrooms("all");
  //   setBathrooms("all");
  // };

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
              Luxury <span className="text-primary">Properties</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional properties tailored to your lifestyle
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-muted-foreground">
            {filteredProperties?.length || 0} properties found
          </div>
          <Button
            variant="outline"
            className="lg:hidden gap-2"
            onClick={() => setShowFilters(!showFilters)}
            data-testid="button-toggle-filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* <motion.aside
            initial={false}
            animate={{
              x: showFilters ? 0 : "-100%",
              opacity: showFilters ? 1 : 0,
            }}
            className={`
              fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-0
              w-80 lg:w-80 bg-card/95 lg:bg-card/40 backdrop-blur-xl
              border-r border-white/10 p-6 lg:p-6 lg:rounded-xl lg:border
              overflow-y-auto
              ${showFilters ? "block" : "hidden lg:block"}
            `}
            data-testid="filters-sidebar"
          >
            <div className="flex items-center justify-between mb-6 lg:mb-6">
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  data-testid="button-clear-filters"
                >
                  Clear
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                  data-testid="button-close-filters"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Price Range
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000000}
                    step={100000}
                    className="mb-2"
                    data-testid="slider-price"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                    <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Property Type
                </Label>
                <div className="space-y-3">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => handleTypeToggle(type)}
                        data-testid={`checkbox-type-${type.toLowerCase().replace(/\s+/g, "-")}`}
                      />
                      <label
                        htmlFor={type}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Location
                </Label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger data-testid="select-filter-location">
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Bedrooms
                  </Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger data-testid="select-bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Bathrooms
                  </Label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger data-testid="select-bathrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.aside> */}

          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-card/40 rounded-lg h-96" />
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
                <p className="text-lg text-muted-foreground">
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
