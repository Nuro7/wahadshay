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

    // Tiny, slow gold dust particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: -Math.random() * 0.35 - 0.08,
        opacity: Math.random() * 0.35 + 0.15,
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

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-45 z-0" />;
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
    <div ref={containerRef} style={{ opacity: 0 }} className="text-center lg:text-left flex-1 min-w-[120px] translate-y-4 stat-reveal">
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
    let titleTimeline: gsap.core.Timeline | null = null;

    const startAnimations = () => {
      // 1. Cinematic reveals via GSAP
      titleTimeline = gsap.timeline({ delay: 0.2 });

      titleTimeline.fromTo(
        ".word-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1.3,
          ease: "power4.out",
        }
      );

      titleTimeline.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      );

      titleTimeline.fromTo(
        ".hero-btn-container button, .hero-btn-container a",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );

      titleTimeline.fromTo(
        ".stat-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    };

    if (document.body.classList.contains("splash-done")) {
      startAnimations();
    } else {
      window.addEventListener("splash-complete", startAnimations);
    }

    // 2. Mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      gsap.to(parallaxVideoRef.current, { x: x * 18, y: y * 18, duration: 1.4, ease: "power2.out" });
      gsap.to(lightingRef.current, { x: -x * 30, y: -y * 30, duration: 1.6, ease: "power2.out" });
    };

    // 3. Scroll-based parallax
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight) return;

      if (parallaxVideoRef.current) {
        parallaxVideoRef.current.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
      }
      if (lightingRef.current) {
        lightingRef.current.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    return () => {
      if (titleTimeline) titleTimeline.kill();
      window.removeEventListener("splash-complete", startAnimations);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen w-full bg-plum-dark flex items-center justify-center relative overflow-hidden pt-28 pb-32 md:pt-36 md:pb-40"
    >
      {/* Background Video Layer */}
      <div
        ref={parallaxVideoRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none will-change-transform"
      >
        <video
          src="/home.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90 scale-[1.03]"
        />
        {/* Soft vignette overlays to preserve branding and layout legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E1A47]/95 via-[#2E1A47]/60 to-[#2E1A47]/95 md:bg-gradient-to-r md:from-[#2E1A47]/90 md:via-[#2E1A47]/70 md:to-transparent z-1 pointer-events-none" />
      </div>

      {/* Cinematic Lighting Layers */}
      <div
        ref={lightingRef}
        className="absolute inset-0 pointer-events-none z-1 will-change-transform"
      >
        {/* Warm Golden Key Light */}
        <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-[radial-gradient(circle_at_top_left,rgba(245,189,32,0.08)_0%,transparent_75%)]" />
        {/* Violet rim light */}
        <div className="absolute bottom-0 right-0 w-[50%] h-[70%] bg-[radial-gradient(circle_at_bottom_right,rgba(108,59,255,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Slow gold particles */}
      <CanvasParticles />

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">

        {/* Left Side Copywriting */}
        <div className="space-y-8 flex flex-col justify-center text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
          <div className="space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.25em] text-yellow">
              Taste the Extraordinary
            </span>

            {/* Word-by-word reveal heading */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white flex flex-wrap justify-center lg:justify-start gap-x-[0.28em] gap-y-[0.1em]">
              <span className="inline-block word-reveal">A</span>
              <span className="inline-block word-reveal">World</span>
              <span className="inline-block word-reveal">of</span>
              <span className="inline-block word-reveal bg-gradient-to-r from-[#F5BD20] to-[#E3A812] bg-clip-text text-transparent font-black">
                Flavor
              </span>
              <span className="inline-block word-reveal">in</span>
              <span className="inline-block word-reveal">One</span>
              <span className="inline-block word-reveal">Place</span>
            </h1>

            <p style={{ opacity: 0 }} className="hero-subtitle max-w-lg text-sm sm:text-base md:text-lg font-medium leading-relaxed text-grey">
              Globally inspired premium teas and artisan breads crafted with rich heritage, modern elegance, and warm hospitality.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-btn-container flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#menu" className="btn">
              <Button variant="primary">Explore Menu</Button>
            </a>
            <a href="#contact" className="btn">
              <Button variant="secondary">Reserve Table</Button>
            </a>
          </div>

          {/* Counters Row */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap gap-6 justify-center lg:justify-start max-w-lg w-full">
            <CounterItem label="Countries Inspired" target={25} suffix="+" delay={1.3} />
            <CounterItem label="Community" target={600} suffix="K+" delay={1.45} />
            <CounterItem label="Future Outlets" target={100} suffix="+" delay={1.6} />

            <div style={{ opacity: 0 }} className="text-center lg:text-left flex-1 min-w-[120px] translate-y-4 stat-reveal">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-yellow tracking-tight">
                One Cup
              </div>
              <div className="font-body text-[10px] md:text-xs font-semibold tracking-wider text-grey uppercase mt-1">
                Many Stories
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Spacer: Empty space to let background show through */}
        <div className="hidden lg:block h-[380px] sm:h-[450px] lg:h-[550px] w-full" />

      </div>

      {/* Smooth transition fading Hero into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-plum-dark to-transparent pointer-events-none z-10" />

      {/* Mouse Scroll Indicator */}
      <a 
        href="#about"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-80 cursor-pointer group"
      >
        <span className="font-body text-[9px] font-bold tracking-[0.25em] text-white uppercase group-hover:text-yellow transition-colors">
          Scroll
        </span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/40 group-hover:border-yellow/50 flex items-start justify-center p-1 transition-colors">
          <div className="w-[3px] h-[5px] rounded-full bg-yellow animate-scroll-dot" />
        </div>
      </a>
    </section>
  );
}
