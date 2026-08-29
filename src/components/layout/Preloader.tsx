import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const [isDestroyed, setIsDestroyed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark splash as done immediately so hero and app render without delay
    document.body.classList.add("splash-done");
    window.dispatchEvent(new Event("splash-complete"));

    const isMobileDevice = window.innerWidth <= 768;

    const completePreloader = () => {
      setIsDestroyed(true);
    };

    const tl = gsap.timeline({
      onComplete: completePreloader
    });

    if (isMobileDevice) {
      // Mobile: quick 0.35s graceful brand dissolve directly into Hero
      gsap.set(mobileLogoRef.current, {
        opacity: 0,
        scale: 0.95
      });

      tl.to(mobileLogoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out"
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.1");

    } else {
      // Desktop: Fast elegant entrance without holding screen
      gsap.set(iconRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 10
      });
      gsap.set(wordmarkRef.current, {
        opacity: 0,
        x: 15
      });
      gsap.set(taglineRef.current, {
        opacity: 0,
        y: 8
      });

      tl.to(iconRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      tl.to(wordmarkRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

      tl.to(taglineRef.current, {
        opacity: 0.9,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2");

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, "+=0.3");
    }

    return () => {
      tl.kill();
    };
  }, []);

  if (isDestroyed) return null;

  return (
    <>
      <style>{`
        :root {
          --splash-bg: #2E1A47;
          --splash-glow: rgba(94, 38, 137, 0.45);
        }

        /* Splash Screen Container */
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
          will-change: transform, opacity;
        }

        /* Ambient shifting background glow */
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

        /* Floating blurred glowing circles (Orbs) */
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
          filter: blur(140px);
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

        /* Centered content layout */
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
          will-change: transform, opacity;
          z-index: 12;
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

        /* Logo Wrapper */
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

        /* Wordmark wrapper */
        .text-wrapper {
          height: 106px;
          width: auto;
          will-change: transform, opacity, filter;
          z-index: 11;
        }

        .splash-wordmark {
          height: 100%;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* Tagline wrapper */
        .tagline-wrapper {
          will-change: transform, opacity, filter;
          margin-top: -2px;
        }

        .splash-tagline {
          height: 26px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* Accessibility overrides */

        @media (max-width: 768px) {
          .desktop-logo-group {
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
          .logo-wrapper {
            height: 90px;
          }
          .logo-wrapper.reveal-stage2 {
            transform: none;
          }
          .text-wrapper {
            height: 70px;
            position: static;
            left: 0;
          }
          .text-wrapper.reveal-stage2 {
            transform: none;
          }
          .splash-tagline {
            height: 20px;
          }
        }

        /* Accessibility preferences: prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .splash-container {
            transition: opacity 300ms ease;
          }
          .splash-container.splash-exit {
            transform: none;
            opacity: 0;
          }
          .logo-wrapper, .text-wrapper, .tagline-wrapper {
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
            transition: none !important;
          }
          .splash-particle, .orb {
            animation: none !important;
            display: none;
          }
          body:not(.splash-done) #home {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="splash-container pointer-events-none"
      >
        {/* Background glow shifting */}
        <div className="splash-bg-glow" />

        {/* Seamless premium food pattern background */}
        <div className="absolute inset-0 food-pattern-bg opacity-35 pointer-events-none mix-blend-overlay" />

        {/* Ambient floating orbs */}
        <div className="ambient-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        {/* Logo elements content */}
        <div className="splash-content">
          {/* Desktop multi-part logo */}
          <div className="desktop-logo-group">
            <div className="logo-text-row">
              {/* Stage 1: Icon reveal */}
              <div ref={iconRef} className="logo-wrapper">
                <img
                  src="/icon.webp"
                  alt="Wahad Shay Icon"
                  className="splash-icon"
                  width="139"
                  height="139"
                />
              </div>

              {/* Stage 2: Wordmark slides in */}
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

            {/* Stage 3: Tagline fades in */}
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
            <img src="/logo_wahad.webp" alt="Wahad Shay Logo" className="splash-mobile-logo" width="280" height="140" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;

