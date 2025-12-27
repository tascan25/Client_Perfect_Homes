import { motion } from "framer-motion";
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
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(26, 26, 46, 0.75) 50%, rgba(26, 26, 46, 0.65) 100%)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26, 26, 46, 0.9) 0%, transparent 40%)' }}
        />
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
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight w-full flex flex-col items-center justify-center gap-4"
            style={{ color: '#ffffff' }}
          >
            Discover Your Dream
            <br />
            <span style={{ color: '#d4af37' }}>Perfect Homes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-xl max-w-2xl mx-auto italic"
            style={{ color: '#e0e0e0' }}
          >
           We Are Deal In All Types Property Residential, Commercial, Industrial All Faridabad
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="animate-float">
            <a href="#Featured">
              <div 
                className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
                style={{ borderColor: '#d4af37' }}
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#d4af37' }}
                />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}