import { useEffect } from "react";

/**
 * Smooth scroll via Lenis — desktop only.
 * Uses a dynamic import so the lenis library (18 KB) is NEVER included
 * in the initial JS bundle. It loads asynchronously after the page is
 * interactive, which means zero cost for mobile users (where it's skipped
 * entirely anyway).
 */
export function useLenis() {
  useEffect(() => {
    // Detect mobile touch devices — preserve native hardware momentum scrolling.
    // Skip Lenis entirely on touch devices.
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    let animId: number;
    let lenisInstance: any = null;

    // Dynamic import: Lenis only downloads when this effect runs on desktop.
    // This keeps it completely out of the initial JS bundle.
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      lenisInstance = lenis;
      (window as any).lenis = lenis;

      function raf(time: number) {
        lenis.raf(time);
        animId = requestAnimationFrame(raf);
      }
      animId = requestAnimationFrame(raf);
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (lenisInstance) {
        lenisInstance.destroy();
        delete (window as any).lenis;
      }
    };
  }, []);
}

export default useLenis;
