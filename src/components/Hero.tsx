import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import heroImage from "../../attached_assets/generated_images/luxury_waterfront_mansion_hero.png"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight w-full flex flex-col items-center justify-center gap-4"
          >
            Discover Your Dream
            <br />
            <span className="text-primary">Perfect Homes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto italic"
          >
            Explore the finest collection of premium properties, handpicked for
            discerning clients seeking excellence
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* <div className="bg-card/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </label>
                <Select>
                  <SelectTrigger data-testid="select-location" className="bg-card/60 backdrop-blur border-white/20">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beverly-hills">Beverly Hills</SelectItem>
                    <SelectItem value="malibu">Malibu</SelectItem>
                    <SelectItem value="manhattan">Manhattan</SelectItem>
                    <SelectItem value="miami">Miami Beach</SelectItem>
                    <SelectItem value="aspen">Aspen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  Property Type
                </label>
                <Select>
                  <SelectTrigger data-testid="select-type" className="bg-card/60 backdrop-blur border-white/20">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mansion">Mansion</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                    <SelectItem value="condo">Luxury Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Price Range
                </label>
                <Select>
                  <SelectTrigger data-testid="select-price" className="bg-card/60 backdrop-blur border-white/20">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2m">$1M - $2M</SelectItem>
                    <SelectItem value="2-5m">$2M - $5M</SelectItem>
                    <SelectItem value="5-10m">$5M - $10M</SelectItem>
                    <SelectItem value="10m+">$10M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground opacity-0">
                  Search
                </label>
                <Button
                  size="lg"
                  className="w-full gap-2"
                  data-testid="button-search-properties"
                >
                  <Search className="w-4 h-4" />
                  Search Properties
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Premium Listings
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$2.5B+</div>
                <div className="text-sm text-muted-foreground">
                  Properties Sold
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="animate-float">
            <a href="#Featured">
              <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
