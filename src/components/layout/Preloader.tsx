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
    // Disable scrolling when preloader is active
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.remove("splash-done");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDestroyed(true);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.classList.add("splash-done");
        window.dispatchEvent(new Event("splash-complete"));
      }
    });

    // Set initial states
    gsap.set(iconRef.current, {
      opacity: 0,
      scale: 0.7,
      y: 20,
      rotation: 2,
      // Start shifted right to center of viewport
      x: window.innerWidth > 480 ? 100 : 0
    });
    gsap.set(wordmarkRef.current, {
      opacity: 0,
      x: 30,
      filter: "blur(12px)"
    });
    gsap.set(taglineRef.current, {
      opacity: 0,
      y: 12,
      filter: "blur(8px)"
    });
    gsap.set(mobileLogoRef.current, {
      opacity: 0,
      scale: 0.85,
      y: 20
    });

    // STAGE 1: Icon entrance (0s to 1.2s)
    tl.to(iconRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 1.2,
      ease: "power3.out"
    });
    
    // Animate mobile logo concurrently
    tl.to(mobileLogoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.4,
      ease: "power3.out"
    }, 0);

    // STAGE 2: Icon slides left, Wordmark enters (1.2s to 2.2s)
    tl.addLabel("stage2", 1.2);
    if (window.innerWidth > 480) {
      tl.to(iconRef.current, {
        x: 0,
        duration: 1.0,
        ease: "power4.out"
      }, "stage2");
    }
    tl.to(wordmarkRef.current, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.0,
      ease: "power4.out"
    }, "stage2");

    // STAGE 3: Tagline fades in (2.2s to 3.0s)
    tl.to(taglineRef.current, {
      opacity: 0.75,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, 2.2);

    // STAGE 4: Exit Animation (4.0s)
    tl.to(containerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.9,
      ease: "power4.inOut"
    }, 4.0);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
          background: radial-gradient(circle at center, #5E2689 0%, #2E1A47 100%);
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
          }
          .logo-wrapper {
            height: 100px;
          }
          .splash-icon {
            height: 100%;
          }
          .text-wrapper {
            height: 80px;
          }
          .splash-wordmark {
            height: 100%;
          }
          .logo-wrapper.reveal-stage2 {
            transform: translateX(-80px);
          }
          .text-wrapper {
            left: 20px;
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
        className="splash-container"
      >
        {/* Background glow shifting */}
        <div className="splash-bg-glow" />

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
                  src="/icon.png"
                  alt="Wahad Shay Icon"
                  className="splash-icon"
                />
              </div>

              {/* Stage 2: Wordmark slides in */}
              <div ref={wordmarkRef} className="text-wrapper">
                <img
                  src="/wordmark.png"
                  alt="Wahad Shay Wordmark"
                  className="splash-wordmark"
                />
              </div>
            </div>

            {/* Stage 3: Tagline fades in */}
            <div ref={taglineRef} className="tagline-wrapper">
              <img
                src="/tagline.png"
                alt="Wahad Shay Tagline"
                className="splash-tagline"
              />
            </div>
          </div>

          {/* Mobile single logo */}
          <div ref={mobileLogoRef} className="mobile-logo-wrapper">
            <img src="/logo_wahad.png" alt="Wahad Shay Logo" className="splash-mobile-logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;

