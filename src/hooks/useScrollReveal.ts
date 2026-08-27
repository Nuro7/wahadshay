import { useEffect } from "react";

/**
 * Custom React hook that implements a high-performance scroll reveal system
 * using the native IntersectionObserver API.
 * 
 * Target elements must have the `.reveal` CSS class.
 * Supports staggered children using CSS variables (`--stagger-idx`).
 * Seamlessly handles dynamic DOM updates via MutationObserver.
 */
export function useScrollReveal() {
  useEffect(() => {
    const checkVisible = () => {
      const reveals = document.querySelectorAll(".reveal:not(.reveal-active)");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("reveal-active");
        }
      });
    };

    // 1. Create the IntersectionObserver for reveal elements
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
        rootMargin: "50px",
        threshold: 0.05,
      }
    );

    // 2. Observe all current elements matching the `.reveal` class
    const observeAll = () => {
      const elements = document.querySelectorAll(".reveal:not(.reveal-active)");
      elements.forEach((el) => observer.observe(el));
      checkVisible();
    };

    observeAll();

    // 3. Setup a MutationObserver to observe elements loaded/rendered later or on re-render
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement;
          if (target.classList?.contains("reveal") && !target.classList.contains("reveal-active")) {
            observer.observe(target);
            shouldCheck = true;
          }
        } else if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.classList.contains("reveal")) {
                observer.observe(node);
                shouldCheck = true;
              }
              const descendants = node.querySelectorAll(".reveal");
              descendants.forEach((desc) => {
                observer.observe(desc);
                shouldCheck = true;
              });
            }
          });
        }
      });
      if (shouldCheck) {
        checkVisible();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("scroll", checkVisible, { passive: true });
    window.addEventListener("resize", checkVisible, { passive: true });

    // 4. Cleanup observers on unmount
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", checkVisible);
      window.removeEventListener("resize", checkVisible);
    };
  }, []);
}

export default useScrollReveal;
