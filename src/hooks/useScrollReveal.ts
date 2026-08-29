import { useEffect } from "react";

/**
 * High-performance scroll reveal system using the native IntersectionObserver API.
 * Target elements must have the `.reveal` CSS class.
 * Avoids any forced synchronous layout / reflow during scroll.
 */
export function useScrollReveal() {
  useEffect(() => {
    // 1. Create native IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 100px 0px",
        threshold: 0.02,
      }
    );

    // 2. Observe all current elements
    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal:not(.reveal-active)");
      const viewportHeight = window.innerHeight;
      
      elements.forEach((el) => {
        // Fallback for iOS Safari: if the element is already in the viewport
        // when observed, sometimes IntersectionObserver doesn't fire until scroll.
        // We manually check getBoundingClientRect and reveal if it's visible.
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
          el.classList.add("reveal-active");
        } else {
          observer.observe(el);
        }
      });
    };

    observeElements();

    // 3. MutationObserver for dynamic React DOM changes
    let mutationTimeout: NodeJS.Timeout | null = null;
    const mutationObserver = new MutationObserver(() => {
      if (mutationTimeout) clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(observeElements, 60);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 4. Cleanup on unmount
    return () => {
      if (mutationTimeout) clearTimeout(mutationTimeout);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default useScrollReveal;
