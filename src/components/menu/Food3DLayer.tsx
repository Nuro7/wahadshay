import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface Food3DLayerProps {
  image: string;
  alt: string;
  transitionStyle?: string;
}

export const Food3DLayer: React.FC<Food3DLayerProps> = ({ image, alt, transitionStyle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth mouse follow
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Glow behind the food */}
        <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.15)_0%,transparent_70%)] rounded-full blur-xl [transform:translateZ(-50px)] pointer-events-none" />

        {/* Main food image */}
        <motion.img
          src={image}
          alt={alt}
          initial={{ scale: 0.8, opacity: 0, z: -100 }}
          animate={{ scale: 1, opacity: 1, z: 50 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] [transform:translateZ(50px)]"
        />
        
        {/* Decorative elements based on style could go here */}
        {transitionStyle === "steam" && (
          <motion.div 
             className="absolute top-10 w-24 h-48 bg-white/10 blur-2xl rounded-full [transform:translateZ(20px)]"
             animate={{ y: [-10, -30, -10], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </div>
  );
};
