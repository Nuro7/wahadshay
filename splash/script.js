document.addEventListener('DOMContentLoaded', () => {
  const splashContainer = document.getElementById('splash-preloader');
  const logoWrapper = document.getElementById('logo-wrapper');
  const textWrapper = document.getElementById('text-wrapper');
  const taglineWrapper = document.getElementById('tagline-wrapper');
  const mainContent = document.getElementById('main-content');

  // Lock scrolling & set screen reader visibility
  document.body.classList.add('splash-active');
  if (mainContent) {
    mainContent.setAttribute('aria-hidden', 'true');
    mainContent.style.visibility = 'hidden';
  }

  // Create GSAP timeline coordinating all stages
  const tl = gsap.timeline({
    onComplete: () => {
      if (splashContainer && splashContainer.parentNode) {
        splashContainer.parentNode.removeChild(splashContainer);
      }
      document.body.classList.remove('splash-active');
    }
  });

  // Set initial states
  gsap.set(logoWrapper, {
    opacity: 0,
    scale: 0.7,
    y: 20,
    rotation: 2,
    x: window.innerWidth > 480 ? 100 : 0
  });
  gsap.set(textWrapper, {
    opacity: 0,
    x: 30,
    filter: "blur(12px)"
  });
  gsap.set(taglineWrapper, {
    opacity: 0,
    y: 12,
    filter: "blur(8px)"
  });

  // STAGE 1: Icon entrance (0s to 1.2s)
  tl.to(logoWrapper, {
    opacity: 1,
    scale: 1,
    y: 0,
    rotation: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  // STAGE 2: Icon slides left, Wordmark enters (1.2s to 2.2s)
  tl.addLabel("stage2", 1.2);
  if (window.innerWidth > 480) {
    tl.to(logoWrapper, {
      x: 0,
      duration: 1.0,
      ease: "power4.out"
    }, "stage2");
  }
  tl.to(textWrapper, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.0,
    ease: "power4.out"
  }, "stage2");

  // STAGE 3: Tagline fades in (2.2s to 3.0s)
  tl.to(taglineWrapper, {
    opacity: 0.75,
    y: 0,
    filter: "blur(0px)",
    duration: 0.8,
    ease: "power2.out"
  }, 2.2);

  // STAGE 4: Exit Animation (4.0s)
  tl.to(splashContainer, {
    yPercent: -100,
    opacity: 0,
    duration: 0.9,
    ease: "power4.inOut"
  }, 4.0);

  // Website Reveal: Fade & rise Hero content
  tl.to(mainContent, {
    onStart: () => {
      if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.setAttribute('aria-hidden', 'false');
      }
    },
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power4.out"
  }, 4.15); // Offset by 150ms delay
});
