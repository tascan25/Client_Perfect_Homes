import { useState, useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import companyvideo from '../assets/video/compvid.mp4'

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      setIsPlaying(false);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 px-4"
      style={{ background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight flex flex-col items-center justify-center gap-4 italic"
            style={{ color: '#d4af37' }}
          >
            Perfect Home
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Experience the journey of finding your dream property with Perfect Homes
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden shadow-2xl group"
        >
          {/* Video Element */}
          <div className="relative aspect-video" style={{ backgroundColor: '#1a1a2e' }}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              onEnded={handleVideoEnd}
              poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
            >
              <source src={companyvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(26, 26, 46, 0.6) 0%, transparent 50%)' }}
            />

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <div 
                className={`rounded-full p-6 transition-all duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.95)' }}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" style={{ color: '#1a1a2e' }} />
                ) : (
                  <Play className="w-8 h-8 ml-1" style={{ color: '#1a1a2e' }} />
                )}
              </div>
            </button>
          </div>

          {/* Bottom Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 p-8"
            style={{ background: 'linear-gradient(to top, rgba(26, 26, 46, 0.95) 0%, transparent 100%)' }}
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Professional real estate solutions</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(VideoSection);