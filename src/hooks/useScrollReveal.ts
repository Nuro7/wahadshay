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
    // 1. Create the IntersectionObserver for reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            // Stop observing once the animation triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // Triggers when ~20% of the element is visible
      }
    );

    // 2. Observe all current elements matching the `.reveal` class
    const initialElements = document.querySelectorAll(".reveal");
    initialElements.forEach((el) => observer.observe(el));

    // 3. Setup a MutationObserver to observe elements loaded/rendered later
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check the node itself
            if (node.classList.contains("reveal")) {
              observer.observe(node);
            }
            // Check all children/descendants
            const descendants = node.querySelectorAll(".reveal");
            descendants.forEach((desc) => observer.observe(desc));
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 4. Cleanup observers on unmount
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default useScrollReveal;
