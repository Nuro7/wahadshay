import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import teacupImg from "../../assets/wahad_teacup.png";
import burgerImg from "../../assets/dip_burger.png";
import friesImg from "../../assets/loaded_fries.png";
import chilliImg from "../../assets/flying_chilli.png";
import cheeseImg from "../../assets/cheese_dripping.png";
import herbsImg from "../../assets/floating_herbs.png";

const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 1.2 - 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 189, 32, ${p.opacity})`; // Warm Yellow particles
        ctx.fill();
        
        p.x += p.x < 0 || p.x > canvas.width ? -p.x : p.speedX;
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    drawParticles();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 z-0" />;
};

const CounterItem = ({ label, target, suffix = "" }: { label: string; target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const end = target;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(easedProgress * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <div className="text-center md:text-left flex-1 min-w-[100px]">
      <div className="font-numbers text-3xl md:text-4xl font-extrabold text-yellow tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-body text-[10px] md:text-xs font-semibold tracking-wider text-grey uppercase mt-1">
        {label}
      </div>
    </div>
  );
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const teacupRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const loadedFriesRef = useRef<HTMLDivElement>(null);
  const chilli1Ref = useRef<HTMLDivElement>(null);
  const chilli2Ref = useRef<HTMLDivElement>(null);
  const cheeseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const herbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      gsap.to(bgRef.current, { x: x * 30, y: y * 30, duration: 1.2, ease: "power2.out" });
      gsap.to(glowRef.current, { x: -x * 55, y: -y * 55, duration: 1.5, ease: "power2.out" });

      gsap.to(teacupRef.current, { x: x * 10, y: y * 10, duration: 1.2, ease: "power2.out" });
      gsap.to(burgerRef.current, { x: x * -20, y: y * -20, duration: 1.0, ease: "power2.out" });
      gsap.to(cheeseRef.current, { x: x * -18, y: y * -18, duration: 1.05, ease: "power2.out" });
      
      gsap.to(loadedFriesRef.current, { x: x * 35, y: y * 35, duration: 0.8, ease: "power2.out" });
      gsap.to(chilli1Ref.current, { x: x * 50, y: y * 50, rotate: x * 20, duration: 0.75, ease: "power2.out" });
      gsap.to(chilli2Ref.current, { x: x * -35, y: y * -35, rotate: -x * 12, duration: 0.9, ease: "power2.out" });
      gsap.to(herbsRef.current, { x: x * -25, y: y * -25, rotate: x * 15, duration: 1.1, ease: "power2.out" });
    };

    hero.addEventListener("mousemove", onMouseMove);

    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen w-full bg-plum-dark flex items-center justify-center relative overflow-hidden pt-28 pb-32 md:pt-32 md:pb-40"
    >
      {/* Animated gradient backgrounds */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-plum)_0%,_transparent_75%)] opacity-35 z-0 pointer-events-none"
      />
      <div 
        ref={glowRef}
        className="absolute top-[15%] right-[5%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#9333ea] rounded-full blur-[140px] md:blur-[220px] opacity-35 z-0 pointer-events-none animate-glow"
      />

      {/* Particle Overlay */}
      <CanvasParticles />

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8">
        
        {/* Left Side: Copywriting */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="space-y-8 flex flex-col justify-center text-center md:text-left order-2 md:order-1"
        >
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-plum border border-white/10 text-xs font-bold uppercase tracking-[0.25em] text-yellow shadow-inner">
              Taste the Extraordinary
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
              A World of{" "}
              <span className="relative inline-block bg-gradient-to-r from-yellow via-[#ffe28a] to-yellow bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(245,189,32,0.5)] py-1 font-black">
                Flavor
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-[4px] bg-yellow rounded"
                />
              </span>{" "}
              in One Place
            </h1>
            <p className="max-w-lg text-base md:text-lg font-medium leading-relaxed text-grey">
              Globally inspired flavours crafted with premium ingredients and unforgettable experiences.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button variant="primary">Explore Menu</Button>
            <Button variant="secondary">Our Specials</Button>
          </div>

          {/* Counters Row */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 justify-center md:justify-start max-w-lg">
            <CounterItem label="Countries Inspired" target={25} suffix="+" />
            <CounterItem label="Community" target={600} suffix="K+" />
            <CounterItem label="Future Global Outlets" target={100} />
            <div className="text-center md:text-left flex-1 min-w-[100px]">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-yellow tracking-tight">
                One Cup
              </div>
              <div className="font-body text-[10px] md:text-xs font-semibold tracking-wider text-grey uppercase mt-1">
                Many Stories
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Premium Food Composition */}
        <div className="relative h-[340px] sm:h-[450px] md:h-[550px] w-full flex items-center justify-center order-1 md:order-2">
          
          {/* Background Ambient Glow */}
          <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-plum/50 rounded-full blur-[100px] pointer-events-none z-0" />
          
          <div className="relative w-full h-full max-w-[480px] flex items-center justify-center">
            
            {/* Steam lines rising from Teacup (placed behind burger, above teacup) */}
            <div className="absolute top-[8%] left-[45%] w-[80px] h-[120px] pointer-events-none z-12 flex justify-between">
              <svg className="w-full h-full text-white/20" viewBox="0 0 100 100" fill="none">
                <path className="animate-steam-line" d="M30,90 Q15,60 30,30 T15,0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path className="animate-steam-line" style={{ animationDelay: "1.5s", animationDuration: "6s" }} d="M50,90 Q65,60 50,30 T65,0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path className="animate-steam-line" style={{ animationDelay: "3s", animationDuration: "8s" }} d="M70,90 Q55,60 70,30 T55,0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Teacup (Middle Depth, Behind Burger) */}
            <div 
              ref={teacupRef}
              className="absolute w-[260px] sm:w-[350px] bottom-[12%] z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] mix-blend-lighten"
            >
              <img 
                src={teacupImg} 
                alt="Wahad Shay Premium Tea Cup" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Cheese Dripping (Middle-Front Depth, layered on Burger) */}
            <div 
              ref={cheeseRef}
              className="absolute w-[180px] sm:w-[240px] top-[42%] left-[10%] z-22 pointer-events-none mix-blend-screen"
            >
              <img 
                src={cheeseImg} 
                alt="Cheese drip effect" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Large Dip Burger (Center, Front Depth) */}
            <div 
              ref={burgerRef}
              className="absolute w-[240px] sm:w-[320px] top-[15%] left-[8%] z-20 filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)] mix-blend-lighten animate-float-burger"
            >
              <img 
                src={burgerImg} 
                alt="Juicy Dip Burger" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Loaded Fries (Right Side, Front-Right Depth, Overlapping Burger) */}
            <div 
              ref={loadedFriesRef}
              className="absolute w-[180px] sm:w-[230px] bottom-[15%] right-[-5%] z-25 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] mix-blend-lighten animate-float-fries"
            >
              <img 
                src={friesImg} 
                alt="Loaded Fries" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Floating Herbs & Sesame Seeds Layer */}
            <div 
              ref={herbsRef}
              className="absolute inset-0 z-30 pointer-events-none"
            >
              <img 
                src={herbsImg} 
                alt="Floating herbs" 
                className="w-full h-full object-contain opacity-80"
              />
            </div>

            {/* Flying Chilli 1 (High Depth, left side) */}
            <div 
              ref={chilli1Ref}
              className="absolute w-[50px] sm:w-[70px] bottom-[8%] left-[5%] z-35 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)] mix-blend-lighten animate-float-chilli"
            >
              <img 
                src={chilliImg} 
                alt="Hot Chilli" 
                className="w-full h-auto object-contain transform rotate-45"
              />
            </div>

            {/* Flying Chilli 2 (High Depth, top-right) */}
            <div 
              ref={chilli2Ref}
              className="absolute w-[60px] sm:w-[80px] top-[22%] right-[-15%] z-35 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)] mix-blend-lighten animate-float-chilli"
              style={{ animationDelay: "1s" }}
            >
              <img 
                src={chilliImg} 
                alt="Hot Chilli" 
                className="w-full h-auto object-contain transform -rotate-12"
              />
            </div>

            {/* Micro-Animated Floating Sesame Seeds */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-2 bg-yellow/80 rounded-full z-25 pointer-events-none"
                style={{
                  top: `${20 + Math.random() * 50}%`,
                  left: `${20 + Math.random() * 60}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}

          </div>
        </div>

      </div>

      {/* Curved Yellow Wave & Dubai Skyline Silhouette bottom visual */}
      <div className="absolute bottom-0 left-0 w-full h-[140px] md:h-[180px] overflow-hidden pointer-events-none z-20">
        <svg 
          className="absolute bottom-0 left-0 w-full h-full" 
          viewBox="0 0 1440 180" 
          fill="none" 
          preserveAspectRatio="none"
        >
          {/* Dubai Skyline Silhouette (Dark Plum) */}
          <path 
            d="M0 180 L 0 130 L 30 130 L 30 100 L 50 100 L 50 130 L 80 130 L 80 80 L 110 80 L 110 130 L 180 130 C 185 95, 205 60, 235 60 C 220 90, 215 115, 215 130 L 260 130 L 260 90 L 280 90 L 285 50 L 290 90 L 310 90 L 310 130 L 380 130 L 390 60 L 400 130 L 450 130 L 450 105 L 470 85 L 490 105 L 490 130 L 540 130 L 540 70 L 560 70 L 560 130 L 575 130 L 575 70 L 595 70 L 595 130 L 700 130 L 705 115 L 705 95 L 710 95 L 710 75 L 715 75 L 715 55 L 720 55 L 720 25 L 722 25 L 722 10 L 724 10 L 724 25 L 726 25 L 726 55 L 731 55 L 731 75 L 736 75 L 736 95 L 741 95 L 741 115 L 746 130 L 820 130 L 820 90 L 850 90 L 850 70 L 870 70 L 870 130 L 920 130 L 920 85 L 945 85 L 945 130 L 1000 130 L 1005 70 L 1030 70 L 1035 130 L 1120 130 L 1130 90 L 1150 90 L 1160 130 L 1220 130 L 1230 50 L 1245 50 L 1255 130 L 1320 130 L 1330 95 L 1350 95 L 1360 130 L 1440 130 L 1440 180 Z" 
            fill="#2E1A47" 
            opacity="0.8" 
          />
          
          {/* Foreground curved yellow wave */}
          <path 
            d="M0,140 C360,200 720,100 1080,160 C1260,185 1380,170 1440,155 L1440,180 L0,180 Z" 
            fill="#F5BD20" 
          />
        </svg>
      </div>

      {/* One Cup. Many Stories. Text */}
      <div className="absolute bottom-6 left-10 z-20 hidden md:block">
        <span className="font-display text-lg font-bold text-white tracking-wide">
          One Cup. <span className="text-yellow">Many Stories.</span>
        </span>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-80">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] text-white uppercase">
          Scroll
        </span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/40 flex items-start justify-center p-1">
          <motion.div 
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-[3px] h-[5px] rounded-full bg-yellow"
          />
        </div>
      </div>
    </section>
  );
}
export default Hero;
