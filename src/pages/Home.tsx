import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedListings from "../components/FeaturedListings";
import Testimonials from "../components/Testimonials";
import { Button } from "../components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Award, Shield, Users } from "lucide-react";
import VideoSection from "../components/VideoSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <VideoSection/>
      <FeaturedListings />

      <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Why Choose <span style={{ color: '#d4af37' }}>Perfect Homes</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
              Unparalleled service and expertise in luxury real estate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Properties",
                description: "Curated collection of the finest luxury estates worldwide",
              },
              {
                icon: Users,
                title: "Expert Agents",
                description: "Dedicated professionals with deep market knowledge",
              },
              {
                icon: Shield,
                title: "Trusted Service",
                description: "Confidential, secure, and personalized experience",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-8 rounded-xl backdrop-blur-lg hover-elevate transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: '#d4af37' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1a1a2e' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666666' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              asChild 
              data-testid="button-view-all"
              className="transition-all hover:scale-105"
              style={{
                backgroundColor: '#d4af37',
                color: '#1a1a2e',
                fontWeight: '600'
              }}
            >
              <Link href="/properties">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center backdrop-blur-xl rounded-2xl p-12 md:p-16 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.97) 0%, rgba(26, 26, 46, 0.93) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: '#ffffff' }}>
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#e0e0e0' }}>
              Let our expert team guide you through every step of your luxury real estate journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                data-testid="button-browse-properties"
                className="transition-all hover:scale-105"
                style={{
                  backgroundColor: '#d4af37',
                  color: '#1a1a2e',
                  fontWeight: '600'
                }}
              >
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                data-testid="button-contact-us"
                className="transition-all hover:scale-105"
                style={{
                  borderColor: '#d4af37',
                  color: '#ffffff'
                }}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}