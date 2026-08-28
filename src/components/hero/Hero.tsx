import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useLanguage } from "../../i18n/LanguageContext";



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

const CounterItem = ({ label, target, suffix = "", delay = 0, isLast = false }: { label: string; target: number; suffix?: string; delay?: number; isLast?: boolean }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
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
    <div ref={containerRef} style={{ opacity: 0 }} className={`text-center flex flex-col items-center justify-center translate-y-4 stat-reveal flex-1 w-full ${!isLast ? "border-e border-white/10" : ""}`}>
      <div className="typo-stat text-yellow">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="typo-badge text-white/75 mt-1.5 px-1 line-clamp-2">
        {label}
      </div>
    </div>
  );
};

export default function Hero() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const parallaxVideoRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const videos = useMemo(() => isMobile ? ['/mobile.mp4'] : ['/home.mp4', '/home1.mp4'], [isMobile]);
  const activeVideoIdx = activeVideoIndex >= videos.length ? 0 : activeVideoIndex;

  const handleVideoEnd = (index: number) => {
    const currentActiveIdx = activeVideoIndex >= videos.length ? 0 : activeVideoIndex;
    if (index !== currentActiveIdx) return;
    const nextIndex = (index + 1) % videos.length;

    // Pre-play the next video before the opacity transition begins
    const nextVid = videoRefs.current[nextIndex];
    if (nextVid) {
      nextVid.currentTime = 0;
      nextVid.play().catch(e => console.error("Video play failed", e));
    }

    setActiveVideoIndex(nextIndex);
  };

  useEffect(() => {
    const vid = videoRefs.current[activeVideoIdx];
    if (vid) {
      vid.muted = true;
      vid.play().catch(() => {});
    }
  }, [activeVideoIdx, isMobile]);

  useEffect(() => {
    // Pause inactive videos after the 1-second crossfade finishes to save resources
    const timeouts = videos.map((_, idx) => {
      const vid = videoRefs.current[idx];
      if (!vid || idx === activeVideoIndex) return null;

      return setTimeout(() => {
        vid.pause();
      }, 1000);
    });

    return () => {
      timeouts.forEach(t => t && clearTimeout(t));
    };
  }, [activeVideoIndex, videos]);

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
      className="min-h-screen min-h-[100svh] w-full bg-plum-dark flex flex-col justify-between items-center relative overflow-hidden pt-[calc(env(safe-area-inset-top,24px)+72px)] pb-[calc(env(safe-area-inset-bottom,20px)+64px)] px-4 xs:px-5 md:pt-24 md:pb-20 lg:flex-row lg:items-center"
    >
      {/* Background Video Layer */}
      <div
        ref={parallaxVideoRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-plum-dark will-change-transform"
      >
        {videos.map((src, idx) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[idx] = el;
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
              }
            }}
            src={src}
            poster={isMobile ? "/mobile-poster.webp" : "/home-poster.webp"}
            autoPlay={idx === 0}
            muted
            playsInline
            preload={isMobile ? "metadata" : "auto"}
            onLoadedData={(e) => {
              if (idx === activeVideoIdx) {
                (e.currentTarget as HTMLVideoElement).play().catch(() => {});
              }
            }}
            onEnded={() => handleVideoEnd(idx)}
            loop={isMobile}
            className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.03] transition-opacity duration-1000 ease-in-out bg-plum-dark ${idx === activeVideoIdx ? 'opacity-90 z-10' : 'opacity-0 z-0'
              }`}
          />
        ))}
        {/* Soft vignette overlays to preserve branding and layout legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E1A47]/80 via-[#2E1A47]/40 to-[#2E1A47]/90 md:bg-gradient-to-r md:from-[#2E1A47]/90 md:via-[#2E1A47]/70 md:to-transparent z-1 pointer-events-none" />
      </div>

      {/* Cinematic Lighting Layers */}
      <div
        ref={lightingRef}
        className="absolute inset-0 pointer-events-none z-1 will-change-transform"
      >
        {/* Warm Golden Key Light */}
        <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-[radial-gradient(circle_at_top_left,rgba(245,189,32,0.08)_0%,transparent_75%)]" />
        {/* Violet rim light */}
        <div className="absolute bottom-0 right-0 w-[50%] h-[70%] bg-[radial-gradient(circle_at_bottom_right,rgba(94,38,137,0.15)_0%,transparent_60%)]" />
      </div>

      {/* Slow gold particles */}
      <CanvasParticles />

      {/* Content wrapper */}
      <div className="relative z-20 premium-container flex flex-col lg:grid lg:grid-cols-2 items-center lg:items-center justify-between flex-1 w-full gap-6 lg:gap-12" dir="ltr">

        {/* Left Side Copywriting */}
        <div dir={language === 'AR' ? 'rtl' : 'ltr'} className="space-y-6 md:space-y-8 flex flex-col justify-start md:justify-center text-start rtl:text-end items-start rtl:items-end max-w-2xl mx-auto lg:mx-0 w-full">
          <div className="space-y-4 flex flex-col items-start rtl:items-end text-start rtl:text-end w-full">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 typo-eyebrow text-yellow whitespace-nowrap mb-2">
              {t('hero.badge')}
            </span>

            {/* Word-by-word reveal heading grouped by lines for perfect text left alignment */}
            <h1 className="typo-display-xl text-white text-start rtl:text-end w-full">
              {language === 'AR' ? (
                <>
                  <span className="block lg:inline lg:me-[0.28em]">
                    {(t('hero.heading') as any).slice(0, 3).map((word: any, idx: number) => (
                      <span key={idx} className={`inline-block word-reveal ms-[0.28em] ${word.highlight ? 'text-shimmer-gold font-black' : ''}`}>
                        {word.text}
                      </span>
                    ))}
                  </span>
                  <span className="block lg:inline">
                    {(t('hero.heading') as any).slice(3, 6).map((word: any, idx: number) => (
                      <span key={idx} className={`inline-block word-reveal ms-[0.28em] ${word.highlight ? 'text-shimmer-gold font-black' : ''}`}>
                        {word.text}
                      </span>
                    ))}
                  </span>
                </>
              ) : (
                <>
                  <span className="block lg:inline lg:me-[0.28em]">
                    {(t('hero.heading') as any).slice(0, 4).map((word: any, idx: number) => (
                      <span key={idx} className={`inline-block word-reveal me-[0.28em] ${word.highlight ? 'text-shimmer-gold font-black' : ''}`}>
                        {word.text}
                      </span>
                    ))}
                  </span>
                  <span className="block lg:inline">
                    {(t('hero.heading') as any).slice(4, 7).map((word: any, idx: number) => (
                      <span key={idx} className={`inline-block word-reveal me-[0.28em] ${word.highlight ? 'text-shimmer-gold font-black' : ''}`}>
                        {word.text}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </h1>

            <p style={{ opacity: 0 }} className="hero-subtitle max-w-prose lg:max-w-xl typo-body-lg text-white/80 text-start rtl:text-end">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons - Compact, solid yellow button aligned to the left */}
          <div className="hero-btn-container flex justify-start rtl:justify-end w-full">
            <a
              href="#specials"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '#specials');
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }}
              className="w-fit"
            >
              <button className="bg-yellow text-plum-dark rounded-full h-[42px] px-6 typo-button active:scale-[0.97] transition-all duration-300 shadow-[0_4px_14px_rgba(245,189,32,0.25)] hover:shadow-[0_6px_20px_rgba(245,189,32,0.35)] hover:-translate-y-[2px] transform cursor-pointer">
                {t('hero.exploreMenu')}
              </button>
            </a>
          </div>

          {/* Desktop Counters Row (Hidden on Mobile) */}
          <div className="hidden lg:grid grid-cols-3 w-full pt-8 border-t border-white/10">
            <CounterItem label={t('hero.countriesInspired')} target={25} suffix="+" delay={1.3} />
            <CounterItem label={t('hero.community')} target={600} suffix="K+" delay={1.45} />
            <CounterItem label={t('hero.futureOutlets')} target={100} suffix="+" delay={1.6} isLast={true} />
          </div>
        </div>

        {/* Right Side Spacer: Empty space to let background show through (Desktop only) */}
        <div className="hidden lg:block h-[380px] sm:h-[420px] lg:h-[480px] w-full" />

        {/* Mobile Product Composition Spacer (Leaves room for the ambient video background showing the Karak cup pour) */}
        <div className="w-full flex-1 min-h-[160px] lg:hidden pointer-events-none" />

        {/* Mobile Counters Row (Visible on Mobile only, placed at the bottom) */}
        <div className="flex lg:hidden w-full pt-4 border-t border-white/10 max-w-[340px] xs:max-w-[360px] sm:max-w-lg">
          <div className="grid grid-cols-3 w-full">
            <CounterItem label={t('hero.countriesInspired')} target={25} suffix="+" delay={1.3} />
            <CounterItem label={t('hero.community')} target={600} suffix="K+" delay={1.45} />
            <CounterItem label={t('hero.futureOutlets')} target={100} suffix="+" delay={1.6} isLast={true} />
          </div>
        </div>

      </div>

      {/* Smooth transition fading Hero into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-plum-dark to-transparent pointer-events-none z-10" />

      {/* Mouse Scroll Indicator (Desktop Only) */}
      <a
        href="#about"
        className="hidden md:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex-col items-center gap-1.5 opacity-80 cursor-pointer group"
      >
        <span className="typo-eyebrow text-white group-hover:text-yellow transition-colors text-[10px]">
          {t('hero.scroll')}
        </span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/40 group-hover:border-yellow/50 flex items-start justify-center p-1 transition-colors">
          <div className="w-[3px] h-[5px] rounded-full bg-yellow animate-scroll-dot" />
        </div>
      </a>
    </section>
  );
}
