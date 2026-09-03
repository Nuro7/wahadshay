import { useState, useEffect, lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Footer from "./components/Footer";
import Preloader from "./components/layout/Preloader";
import SEO from "./components/common/SEO";
import useLenis from "./hooks/useLenis";
import useScrollReveal from "./hooks/useScrollReveal";

// Efficient lazy code splitting for secondary pages & sections
const About = lazy(() => import("./components/About"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FranchiseSection = lazy(() => import("./components/FranchiseSection"));
const FranchiseTeaser = lazy(() => import("./components/FranchiseTeaser"));
const Specials = lazy(() => import("./components/Specials"));
const MissionVision = lazy(() => import("./components/MissionVision"));
const Vision2030 = lazy(() => import("./components/Vision2030"));
const SignatureExperience = lazy(() => import("./components/SignatureExperience"));
const Franchise = lazy(() => import("./components/Franchise"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));
const FAQ = lazy(() => import("./components/FAQ"));

// Minimal elegant spinner for Suspense fallback
const PageSpinner = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] w-full">
    <div className="w-10 h-10 rounded-full border-[3px] border-yellow/30 border-t-yellow animate-spin" />
    <p className="mt-4 text-yellow/70 text-sm animate-pulse tracking-wide font-medium">Loading...</p>
  </div>
);

// SEO-safe 404 View
const NotFound = ({ onGoHome }: { onGoHome: () => void }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[65vh] px-4 text-center select-none py-16">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow/10 border border-yellow/30 text-yellow text-xs font-bold uppercase tracking-widest mb-4">
        404 • Page Not Found
      </div>
      <h1 className="typo-display-lg text-white mb-4">
        Lost in the <span className="text-shimmer-gold">Aroma?</span>
      </h1>
      <p className="typo-body text-white/70 max-w-md mx-auto mb-8">
        The page you are looking for does not exist or has been moved. Discover our signature teas and bakes instead.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={onGoHome}
          className="px-6 py-3 rounded-full bg-yellow text-plum-dark font-bold typo-button-sm shadow-md hover:bg-yellow/90 transition-all cursor-pointer"
        >
          Return to Home
        </button>
        <a
          href="#specials"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, "", "#specials");
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }}
          className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold typo-button-sm hover:border-yellow hover:text-yellow transition-all"
        >
          Explore Specials
        </a>
      </div>
    </div>
  );
};

function resolvePage(): string {
  if (typeof window === "undefined") return "home";

  const hash = window.location.hash.toLowerCase().replace("#", "");
  const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");

  // Hash takes precedence if present
  const target = hash || path || "home";

  if (["home", ""].includes(target)) return "home";
  if (["specials", "menu"].includes(target)) return "specials";
  if (["about"].includes(target)) return "about";
  if (["franchise"].includes(target)) return "franchise";
  if (["gallery"].includes(target)) return "gallery";
  if (["contact", "faq"].includes(target)) return "contact";

  // If path is specified and not recognized, show 404
  if (path && !["home", "specials", "menu", "about", "franchise", "gallery", "contact", "faq"].includes(path)) {
    return "404";
  }

  return "home";
}

function App() {
  useLenis();
  useScrollReveal();

  const [currentPage, setCurrentPage] = useState<string>(() => resolvePage());

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const handleNavigation = () => {
      const targetPage = resolvePage();
      setCurrentPage(targetPage);

      const hash = window.location.hash.toLowerCase().replace("#", "");
      const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
      const section = hash || path;

      let retries = 0;
      const currentUrl = window.location.href;
      const scrollToSection = () => {
        if (window.location.href !== currentUrl) return;

        const scrollTarget = document.getElementById(section);
        if (scrollTarget) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(scrollTarget, {
              offset: section === "faq" ? -100 : 0,
              immediate: true,
            });
          } else {
            scrollTarget.scrollIntoView({ behavior: "instant" });
          }
        } else if (section !== targetPage && section !== "home" && section !== "" && retries < 30) {
          retries++;
          setTimeout(scrollToSection, 100);
        }
      };

      if (section !== targetPage && section !== "home" && section !== "") {
        setTimeout(scrollToSection, 50);
      }
    };

    handleNavigation();
    window.addEventListener("hashchange", handleNavigation);
    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("hashchange", handleNavigation);
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  // Scroll to top immediately on page change if no specific section target
  useEffect(() => {
    const hash = window.location.hash.toLowerCase().replace("#", "");
    if (hash === currentPage || hash === "" || hash === "home") {
      requestAnimationFrame(() => {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      });
    }
  }, [currentPage]);

  const handleGoHome = () => {
    window.history.pushState(null, "", "/");
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SEO page={currentPage as any} />
      <Preloader />

      <Layout currentPage={currentPage}>
        <Navbar currentPage={currentPage} />

        <main className={`flex-1 flex flex-col ${currentPage !== "home" ? "page-content bg-neutral-ivory" : ""}`}>
          {currentPage === "home" && (
            <>
              <Hero />
              <Suspense fallback={<div className="min-h-[200px]" />}>
                <About isHomePage={true} />
                <Testimonials />
                <FranchiseSection />
                <FranchiseTeaser />
              </Suspense>
            </>
          )}

          {currentPage === "specials" && (
            <Suspense fallback={<PageSpinner />}>
              <Specials />
            </Suspense>
          )}

          {currentPage === "about" && (
            <Suspense fallback={<PageSpinner />}>
              <About />
              <MissionVision />
              <Vision2030 />
              <SignatureExperience />
            </Suspense>
          )}

          {currentPage === "franchise" && (
            <Suspense fallback={<PageSpinner />}>
              <Franchise />
              <FranchiseSection />
            </Suspense>
          )}

          {currentPage === "gallery" && (
            <Suspense fallback={<PageSpinner />}>
              <Gallery />
            </Suspense>
          )}

          {currentPage === "contact" && (
            <Suspense fallback={<PageSpinner />}>
              <Contact />
              <FAQ />
            </Suspense>
          )}

          {currentPage === "404" && (
            <NotFound onGoHome={handleGoHome} />
          )}
        </main>

        <Footer />
      </Layout>
    </>
  );
}

export default App;