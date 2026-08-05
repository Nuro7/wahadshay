import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Allow the video intro to show for 3.8 seconds before transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-plum-dark flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle glowing ambient sphere */}
          <div className="absolute w-[400px] h-[400px] bg-plum rounded-full blur-[140px] opacity-40 pointer-events-none" />

          {/* Premium Video Frame */}
          <div className="relative w-[300px] md:w-[600px] aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 bg-black">
            <video
              src="/rendering.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Luxury loader text */}
          <div className="mt-8 z-10 flex flex-col items-center gap-2">
            <span className="font-display text-lg font-bold text-white tracking-widest uppercase">
              Wahad Shay
            </span>
            <div className="flex gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Preloader;
