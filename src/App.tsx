import { useState, useEffect, lazy, Suspense, startTransition, useTransition } from "react";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Footer from "./components/Footer";
import Preloader from "./components/layout/Preloader";
import useLenis from "./hooks/useLenis";
import useScrollReveal from "./hooks/useScrollReveal";

import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FranchiseSection from "./components/FranchiseSection";
import FranchiseTeaser from "./components/FranchiseTeaser";
import Specials from "./components/Specials";
import MissionVision from "./components/MissionVision";
import Vision2030 from "./components/Vision2030";
import SignatureExperience from "./components/SignatureExperience";
import Franchise from "./components/Franchise";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";

// Minimal spinner for Suspense fallback — mostly unused now since pages are bundled
const PageSpinner = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] w-full">
    <div className="w-10 h-10 rounded-full border-[3px] border-yellow/30 border-t-yellow animate-spin" />
    <p className="mt-4 text-yellow/70 text-sm animate-pulse tracking-wide font-medium">Loading...</p>
  </div>
);

function App() {
  useLenis();
  useScrollReveal();

  const [currentPage, setCurrentPage] = useState<string>("home");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);



  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase() || "#home";
      const page = hash.replace("#", "");

      let targetPage = "home";
      if (["home"].includes(page)) {
        targetPage = "home";
      } else if (["specials", "menu"].includes(page)) {
        targetPage = "specials";
      } else if (["about"].includes(page)) {
        targetPage = "about";
      } else if (["franchise"].includes(page)) {
        targetPage = "franchise";
      } else if (["gallery"].includes(page)) {
        targetPage = "gallery";
      } else if (["contact", "faq"].includes(page)) {
        targetPage = "contact";
      }

      setCurrentPage(targetPage);

      let retries = 0;
      const currentHash = window.location.hash;
      const scrollToHash = () => {
        // Stop if the user navigated to another page while we were waiting
        if (window.location.hash !== currentHash) return;
        
        const scrollTarget = document.getElementById(page);
        if (scrollTarget) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(scrollTarget, {
              offset: page === "faq" ? -100 : 0,
              immediate: true,
            });
          } else {
            scrollTarget.scrollIntoView({ behavior: "instant" });
          }
        } else if (page !== targetPage && page !== 'home' && retries < 30) {
          // If the element isn't found yet (Suspense is loading), check again in 100ms
          // Max 30 retries (3 seconds) to prevent infinite loops
          retries++;
          setTimeout(scrollToHash, 100);
        }
      };

      // Only attempt to scroll to a specific section if the hash is not the main page name
      if (page !== targetPage && page !== 'home' && page !== '') {
         setTimeout(scrollToHash, 50);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Scroll to top immediately on page change if no specific hash target
  useEffect(() => {
    const hash = window.location.hash.toLowerCase().replace("#", "");
    // If the hash matches the page name exactly (e.g. #about on about page), scroll to top
    if (hash === currentPage || hash === "" || hash === "home") {
      requestAnimationFrame(() => {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      });
    }
  }, [currentPage]);

  return (
    <>
      <Preloader />

      <Layout>
        <Navbar />

        <main className={`flex-1 flex flex-col ${currentPage !== "home" ? "pt-8 md:pt-10" : ""}`}>
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
        </main>

        <Footer />
      </Layout>
    </>
  );
}

export default App;