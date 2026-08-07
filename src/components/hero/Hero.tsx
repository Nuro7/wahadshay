import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "../ui/Button";

const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    // Reduced particle count by 70% (from 40 to 12) for a very clean, breathing look
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
    
    // Statically seed 12 particles (very tiny, slow dust)
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.8, // Tiny size
        speedX: (Math.random() - 0.5) * 0.15, // Extremely slow drift
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 189, 32, ${p.opacity})`;
        ctx.fill();
        
        p.x += p.speedX;
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
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 z-0" />;
};

const CounterItem = ({ label, target, suffix = "", delay = 0 }: { label: string; target: number; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            let start = 0;
            const duration = 2000;
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
          }, delay * 1000);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [target, delay]);

  return (
    <div ref={containerRef} className="text-center md:text-left flex-1 min-w-[100px] opacity-0 translate-y-4 stat-reveal">
      <div className="font-numbers text-3xl md:text-4xl font-extrabold text-yellow tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-body text-[10px] md:text-xs font-semibold tracking-wider text-grey uppercase mt-1">
        {label}
      </div>
    </div>
  );
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxVideoRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Cinematic reveal animations via GSAP
    const titleTimeline = gsap.timeline({ delay: 0.3 });
    
    // Reveal title word by word (Duration 1.2s, Ease power4.out)
    titleTimeline.fromTo(
      ".word-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: "power4.out",
      }
    );

    // Fade up Subtitle (0.8s)
    titleTimeline.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // Slide buttons upward (0.9s)
    titleTimeline.fromTo(
      ".hero-btn-container .btn",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );

    // Staggered stats reveal
    titleTimeline.fromTo(
      ".stat-reveal",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // 2. Mouse parallax & lighting shift (Subtle & high-end)
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      // Video moves slightly (subtle depth)
      gsap.to(parallaxVideoRef.current, { x: x * 15, y: y * 15, duration: 1.2, ease: "power2.out" });
      // Ambient lighting layers shift slightly
      gsap.to(lightingRef.current, { x: -x * 25, y: -y * 25, duration: 1.5, ease: "power2.out" });
    };

    // 3. Scroll-based parallax (Hero text moves up faster, video moves slower, background stays slowest)
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight) return;

      // Video parallax layer
      if (parallaxVideoRef.current) {
        parallaxVideoRef.current.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      }
      // Light overlay parallax
      if (lightingRef.current) {
        lightingRef.current.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen w-full bg-[#0B0617] flex items-center justify-center relative overflow-hidden pt-28 pb-32 md:pt-32 md:pb-40"
    >
      {/* Background Video Parallax Wrapper */}
      <div 
        ref={parallaxVideoRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none will-change-transform"
      >
        <video
          src="/Website_hero_animation_Wahad_Shay_202608051724.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90 scale-[1.02]"
        />
        {/* Soft, neutral vignette overlay to preserve the natural colors of the food */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0617]/95 via-[#0B0617]/65 to-[#0B0617]/95 md:bg-gradient-to-r md:from-[#0B0617]/90 md:via-[#0B0617]/75 md:to-transparent z-1 pointer-events-none" />
      </div>

      {/* Cinematic Lighting Layers (Warm key light top-left, soft purple rim light bottom-right, and left-side purple gradient) */}
      <div 
        ref={lightingRef}
        className="absolute inset-0 pointer-events-none z-1 will-change-transform"
      >
        {/* Simple purple gradient from left side */}
        <div className="absolute top-0 left-0 w-[55%] h-full bg-gradient-to-r from-[#5E2689]/22 via-[#5E2689]/5 to-transparent" />
        {/* Warm key light upper-left */}
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_top_left,rgba(245,189,32,0.06)_0%,transparent_70%)]" />
        {/* Soft purple rim light right */}
        <div className="absolute bottom-0 right-0 w-[50%] h-[70%] bg-[radial-gradient(circle_at_bottom_right,rgba(108,59,255,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Soft floating dust overlay */}
      <CanvasParticles />

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8">
        
        {/* Left Side Copywriting */}
        <div className="space-y-8 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.25em] text-yellow">
              Taste the Extraordinary
            </span>
            
            {/* Word-by-word reveal heading */}
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white flex flex-wrap justify-center md:justify-start gap-x-[0.28em] gap-y-[0.1em]">
              <span className="inline-block word-reveal">A</span>
              <span className="inline-block word-reveal">World</span>
              <span className="inline-block word-reveal">of</span>
              {/* Highlight gold gradient without text glow or neon dropshadows */}
              <span className="inline-block word-reveal bg-gradient-to-r from-[#F5BD20] to-[#E3A812] bg-clip-text text-transparent font-black">
                Flavor
              </span>
              <span className="inline-block word-reveal">in</span>
              <span className="inline-block word-reveal">One</span>
              <span className="inline-block word-reveal">Place</span>
            </h1>

            <p className="hero-subtitle opacity-0 max-w-lg text-base md:text-lg font-medium leading-relaxed text-grey">
              Globally inspired flavours crafted with premium ingredients and unforgettable experiences.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-btn-container flex flex-wrap gap-4 justify-center md:justify-start">
            <Button variant="primary">Explore Menu</Button>
            <Button variant="secondary">Our Specials</Button>
          </div>

          {/* Counters Row */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 justify-center md:justify-start max-w-lg">
            <CounterItem label="Countries Inspired" target={25} suffix="+" delay={1.4} />
            <CounterItem label="Community" target={600} suffix="K+" delay={1.55} />
            <CounterItem label="Future Global Outlets" target={100} delay={1.7} />
            
            <div className="text-center md:text-left flex-1 min-w-[100px] opacity-0 translate-y-4 stat-reveal">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-yellow tracking-tight">
                One Cup
              </div>
              <div className="font-body text-[10px] md:text-xs font-semibold tracking-wider text-grey uppercase mt-1">
                Many Stories
              </div>
            </div>
          </div>
        </div>

        {/* Right Side spacer */}
        <div className="hidden md:block h-[340px] sm:h-[450px] md:h-[550px] w-full order-1 md:order-2" />

      </div>

      {/* Smooth gradient transition fading Hero into Menu section (replacing wave/skyline) */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-[#0B0617] to-transparent pointer-events-none z-10" />

      {/* Mouse Scroll Indicator (Slow pulsing, no bouncing) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-80 animate-pulse">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] text-white uppercase">
          Scroll
        </span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/40 flex items-start justify-center p-1">
          <div className="w-[3px] h-[5px] rounded-full bg-yellow" />
        </div>
      </div>
    </section>
  );
}

