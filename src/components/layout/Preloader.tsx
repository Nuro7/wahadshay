import { useEffect, useRef, useState } from "react";

/**
 * Preloader / Splash Screen
 *
 * Performance notes:
 * - GSAP is loaded via dynamic import so it does NOT block the initial JS parse.
 *   The splash animation begins only after GSAP arrives (~200ms on fast 4G),
 *   but crucially React and the Hero can already hydrate in parallel.
 * - On mobile the splash is a minimal CSS opacity fade — no heavy blur orbs,
 *   no GSAP dependency during the critical first paint.
 * - The hero section and all page content become visible immediately once the
 *   splash fades out. No artificial minimum delay.
 */
export function Preloader() {
  const [isDestroyed, setIsDestroyed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark splash as done immediately so the hero section can render underneath
    document.body.classList.add("splash-done");
    window.dispatchEvent(new Event("splash-complete"));

    const isMobileDevice = window.innerWidth <= 768;

    const completePreloader = () => {
      setIsDestroyed(true);
    };

    if (isMobileDevice) {
      // Mobile: The inline HTML splash in index.html already showed the brand logo
      // BEFORE any JS loaded. By the time this React Preloader mounts, the inline
      // splash is already fading out (or gone). We don't need to show another logo —
      // just fade out this container quickly and reveal the Hero.
      const container = containerRef.current;

      // Wait for the inline splash fade to finish (~420ms), then fade this out
      const showTimer = setTimeout(() => {
        if (container) {
          container.style.transition = "opacity 0.25s ease-in-out";
          container.style.opacity = "0";
        }
        setTimeout(completePreloader, 270);
      }, 100); // short delay — inline splash is already fading

      return () => clearTimeout(showTimer);

    } else {
      // Desktop: elegant GSAP entrance — loaded dynamically so it doesn't
      // block the initial JS parse for users who never scroll to animations.
      let killed = false;
      let tl: any = null;

      import("gsap").then(({ default: gsap }) => {
        if (killed) return;

        gsap.set(iconRef.current, { opacity: 0, scale: 0.85, y: 10 });
        gsap.set(wordmarkRef.current, { opacity: 0, x: 15 });
        gsap.set(taglineRef.current, { opacity: 0, y: 8 });

        tl = gsap.timeline({ onComplete: completePreloader });

        tl.to(iconRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        tl.to(
          wordmarkRef.current,
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );

        tl.to(
          taglineRef.current,
          { opacity: 0.9, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        );

        tl.to(
          containerRef.current,
          { opacity: 0, duration: 0.4, ease: "power2.inOut" },
          "+=0.3"
        );
      });

      return () => {
        killed = true;
        if (tl) tl.kill();
      };
    }
  }, []);

  if (isDestroyed) return null;

  return (
    <>
      <style>{`
        :root {
          --splash-bg: #2E1A47;
          --splash-glow: rgba(94, 38, 137, 0.45);
        }

        .splash-container {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, #4C1A6E 0%, #2E114D 60%, #150626 100%);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          will-change: opacity;
        }

        /* On mobile, start invisible. The inline HTML splash (in index.html) already
           showed the brand logo before JS loaded. The React Preloader just needs
           to be a transparent layer that fades away to reveal the Hero. */
        @media (max-width: 768px) {
          .splash-container {
            opacity: 0;
            background: transparent;
          }
        }

        /* Desktop-only ambient glow — not rendered on mobile */
        .splash-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--splash-glow) 0%, transparent 65%);
          opacity: 0.55;
          mix-blend-mode: screen;
          pointer-events: none;
          animation: slowGlowShift 10s ease-in-out infinite alternate;
          z-index: 1;
        }

        @keyframes slowGlowShift {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.15) translate(3%, -3%); }
          100% { transform: scale(0.9) translate(-2%, 4%); }
        }

        /* Orbs — desktop only, hidden on mobile via media query */
        .ambient-orbs {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          /* Reduced blur from 140px to 80px — still atmospheric but less GPU work */
          filter: blur(80px);
          opacity: 0.22;
          will-change: transform;
        }

        .orb-1 {
          width: 380px;
          height: 380px;
          background: #5E2689;
          top: 15%;
          left: 20%;
          animation: orbDrift1 22s ease-in-out infinite;
        }

        .orb-2 {
          width: 420px;
          height: 420px;
          background: #F5BD20;
          bottom: 10%;
          right: 15%;
          animation: orbDrift2 26s ease-in-out infinite;
        }

        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, 60px) scale(1.15); }
        }

        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -90px) scale(0.85); }
        }

        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          gap: 20px;
          will-change: transform;
        }

        .desktop-logo-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .mobile-logo-wrapper {
          display: none;
          width: auto;
          height: 140px;
          will-change: opacity, transform;
          z-index: 12;
          /* Start hidden, JS will reveal via inline style */
          opacity: 0;
          transform: scale(0.95);
        }

        .splash-mobile-logo {
          height: 100%;
          width: auto;
          object-fit: contain;
        }

        .logo-text-row {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          position: relative;
          height: 145px;
          gap: 6px;
        }

        .logo-wrapper {
          height: 139px;
          width: auto;
          will-change: transform, opacity;
          z-index: 12;
        }

        .splash-icon {
          height: 100%;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .text-wrapper {
          height: 106px;
          width: auto;
          will-change: transform, opacity;
          z-index: 11;
        }

        .splash-wordmark {
          height: 100%;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .tagline-wrapper {
          will-change: transform, opacity;
          margin-top: -2px;
        }

        .splash-tagline {
          height: 26px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 768px) {
          .desktop-logo-group {
            display: none !important;
          }
          /* On mobile, hide the heavy orbs entirely — saves GPU compositing layers */
          .ambient-orbs,
          .splash-bg-glow {
            display: none !important;
          }
          .mobile-logo-wrapper {
            display: flex !important;
            align-items: center;
            justify-content: center;
            height: clamp(90px, 24vw, 130px);
            padding: 0 1.5rem;
          }
          .splash-mobile-logo {
            height: 100%;
            width: auto;
            max-width: 80vw;
            object-fit: contain;
            filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.45));
          }
        }

        @media (max-width: 480px) {
          .logo-text-row {
            flex-direction: column;
            align-items: center;
            height: auto;
            gap: 16px;
            margin-bottom: 12px;
          }
          .logo-wrapper { height: 90px; }
          .text-wrapper { height: 70px; position: static; left: 0; }
          .splash-tagline { height: 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-container { transition: opacity 300ms ease; }
          .logo-wrapper, .text-wrapper, .tagline-wrapper {
            transform: none !important;
            opacity: 1 !important;
            transition: none !important;
          }
          .splash-particle, .orb { animation: none !important; display: none; }
          body:not(.splash-done) #home { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="splash-container pointer-events-none"
      >
        {/* Background glow — desktop only (hidden on mobile via CSS) */}
        <div className="splash-bg-glow" />

        {/* Subtle food pattern texture */}
        <div className="absolute inset-0 food-pattern-bg opacity-35 pointer-events-none mix-blend-overlay" />

        {/* Ambient floating orbs — desktop only */}
        <div className="ambient-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div className="splash-content">
          {/* Desktop multi-part logo */}
          <div className="desktop-logo-group">
            <div className="logo-text-row">
              <div ref={iconRef} className="logo-wrapper">
                <img
                  src="/icon.webp"
                  alt="Wahad Shay Icon"
                  className="splash-icon"
                  width="139"
                  height="139"
                />
              </div>

              <div ref={wordmarkRef} className="text-wrapper">
                <img
                  src="/wordmark.webp"
                  alt="Wahad Shay Wordmark"
                  className="splash-wordmark"
                  width="200"
                  height="106"
                />
              </div>
            </div>

            <div ref={taglineRef} className="tagline-wrapper">
              <img
                src="/tagline.webp"
                alt="Wahad Shay Tagline"
                className="splash-tagline"
                width="240"
                height="26"
              />
            </div>
          </div>

          {/* Mobile single logo */}
          <div ref={mobileLogoRef} className="mobile-logo-wrapper">
            <img
              src="/logo_wahad.webp"
              alt="Wahad Shay Logo"
              className="splash-mobile-logo"
              width="280"
              height="140"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;
