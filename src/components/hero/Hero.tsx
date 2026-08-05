import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import teacupImg from "../../assets/wahad_teacup.png";
import burgerImg from "../../assets/wahad_burger.png";
import friesImg from "../../assets/floating_fries.png";
import chilliImg from "../../assets/flying_chilli.png";
import cheeseImg from "../../assets/cheese_dripping.png";

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
      // Easing function outQuad
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
  const fries1Ref = useRef<HTMLDivElement>(null);
  const fries2Ref = useRef<HTMLDivElement>(null);
  const chilli1Ref = useRef<HTMLDivElement>(null);
  const chilli2Ref = useRef<HTMLDivElement>(null);
  const cheeseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normal offset (-0.5 to 0.5)
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      // Animate background / ambient glow slowly
      gsap.to(bgRef.current, { x: x * 30, y: y * 30, duration: 1.2, ease: "power2.out" });
      gsap.to(glowRef.current, { x: -x * 55, y: -y * 55, duration: 1.5, ease: "power2.out" });

      // Animate food elements with different depths
      gsap.to(teacupRef.current, { x: x * 15, y: y * 15, duration: 1.2, ease: "power2.out" });
      gsap.to(burgerRef.current, { x: x * -25, y: y * -25, duration: 1.0, ease: "power2.out" });
      gsap.to(cheeseRef.current, { x: x * -22, y: y * -22, duration: 1.05, ease: "power2.out" });
      
      // Outer floating elements have higher depth
      gsap.to(fries1Ref.current, { x: x * 45, y: y * 45, rotate: x * 15, duration: 0.8, ease: "power2.out" });
      gsap.to(fries2Ref.current, { x: x * -55, y: y * -55, rotate: -x * 20, duration: 0.9, ease: "power2.out" });
      gsap.to(chilli1Ref.current, { x: x * 65, y: y * 65, rotate: x * 30, duration: 0.7, ease: "power2.out" });
      gsap.to(chilli2Ref.current, { x: x * -40, y: y * -40, rotate: -x * 10, duration: 0.95, ease: "power2.out" });
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
      className="min-h-screen w-full bg-plum-dark flex items-center justify-center relative overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* Animated gradient backgrounds */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-plum)_0%,_transparent_70%)] opacity-40 z-0 pointer-events-none"
      />
      <div 
        ref={glowRef}
        className="absolute top-[20%] right-[10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#9333ea] rounded-full blur-[140px] md:blur-[200px] opacity-35 z-0 pointer-events-none animate-glow"
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
              A World of <span className="text-yellow relative">Flavor<span className="absolute bottom-1 left-0 w-full h-[6px] bg-yellow/30 rounded"></span></span> in One Place
            </h1>
            <p className="max-w-lg text-base md:text-lg font-medium leading-relaxed text-grey">
              Indulge in our premium signature recipes where artisan craftsmanship meets bold spices. Sip the finest hand-brewed tea paired with hot melting gourmet flavors.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button variant="primary">Explore Menu</Button>
            <Button variant="secondary">Franchise</Button>
          </div>

          {/* Counters Row */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 justify-center md:justify-start max-w-md">
            <CounterItem label="Store Locations" target={40} suffix="+" />
            <CounterItem label="Happy Customers" target={250} suffix="k+" />
            <CounterItem label="Tea Cups Served" target={1.2} suffix="M+" />
          </div>
        </motion.div>

        {/* Right Side: Interactive Parallax Scene */}
        <div className="relative h-[320px] sm:h-[420px] md:h-[520px] w-full flex items-center justify-center order-1 md:order-2">
          
          {/* Ambient Purple Background Highlights */}
          <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] bg-plum/40 rounded-full blur-[100px] pointer-events-none z-0" />
          
          {/* Main composition container */}
          <div className="relative w-full h-full max-w-[450px] flex items-center justify-center">
            
            {/* Steam lines rising from Teacup (placed underneath burger but on top of teacup) */}
            <div className="absolute top-[8%] left-[45%] w-[80px] h-[120px] pointer-events-none z-15 flex justify-between">
              <svg className="w-full h-full text-white/20" viewBox="0 0 100 100" fill="none">
                <path className="animate-steam-line" d="M30,90 Q15,60 30,30 T15,0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path className="animate-steam-line" style={{ animationDelay: "1.5s", animationDuration: "6s" }} d="M50,90 Q65,60 50,30 T65,0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path className="animate-steam-line" style={{ animationDelay: "3s", animationDuration: "8s" }} d="M70,90 Q55,60 70,30 T55,0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Huge Teacup (Middle Depth) */}
            <div 
              ref={teacupRef}
              className="absolute w-[240px] sm:w-[320px] bottom-[10%] z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <img 
                src={teacupImg} 
                alt="Wahad Shay Premium Tea" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Cheese Dripping (Middle-Front Depth, layered relative to Burger) */}
            <div 
              ref={cheeseRef}
              className="absolute w-[180px] sm:w-[240px] top-[40%] left-[10%] z-25 pointer-events-none mix-blend-screen"
            >
              <img 
                src={cheeseImg} 
                alt="Cheese dripping" 
                className="w-full h-auto object-contain animate-pulse-glow"
              />
            </div>

            {/* Large Premium Burger (Front Depth) */}
            <div 
              ref={burgerRef}
              className="absolute w-[220px] sm:w-[300px] top-[18%] left-[12%] z-20 filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)] animate-float-burger"
            >
              <img 
                src={burgerImg} 
                alt="Gourmet Burger" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Floating Fries 1 (High Depth, left side) */}
            <div 
              ref={fries1Ref}
              className="absolute w-[70px] sm:w-[95px] top-[50%] left-[-15%] z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] animate-float-fries"
            >
              <img 
                src={friesImg} 
                alt="Crispy French Fries" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Floating Fries 2 (High Depth, right side) */}
            <div 
              ref={fries2Ref}
              className="absolute w-[80px] sm:w-[105px] top-[10%] right-[-10%] z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] animate-float-fries"
              style={{ animationDelay: "2s" }}
            >
              <img 
                src={friesImg} 
                alt="Crispy French Fries" 
                className="w-full h-auto object-contain transform -rotate-45"
              />
            </div>

            {/* Flying Chilli 1 (High Depth, bottom-left) */}
            <div 
              ref={chilli1Ref}
              className="absolute w-[50px] sm:w-[70px] bottom-[5%] left-[5%] z-30 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.3)] animate-float-chilli"
            >
              <img 
                src={chilliImg} 
                alt="Hot Chilli Pepper" 
                className="w-full h-auto object-contain transform rotate-45"
              />
            </div>

            {/* Flying Chilli 2 (High Depth, top-right) */}
            <div 
              ref={chilli2Ref}
              className="absolute w-[60px] sm:w-[80px] top-[25%] right-[-20%] z-30 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.3)] animate-float-chilli"
              style={{ animationDelay: "1s" }}
            >
              <img 
                src={chilliImg} 
                alt="Hot Chilli Pepper" 
                className="w-full h-auto object-contain transform -rotate-12"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] text-white uppercase">
          Scroll
        </span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/30 flex items-start justify-center p-1">
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
