import { useState, useEffect, lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FranchiseSection from "./components/FranchiseSection";
import FranchiseTeaser from "./components/FranchiseTeaser";
import Footer from "./components/Footer";
import Preloader from "./components/layout/Preloader";
import useLenis from "./hooks/useLenis";
import useScrollReveal from "./hooks/useScrollReveal";

// Lazy-loaded routes to minimize initial bundle size on mobile
const Specials = lazy(() => import("./components/Specials"));
const MissionVision = lazy(() => import("./components/MissionVision"));
const Vision2030 = lazy(() => import("./components/Vision2030"));
const SignatureExperience = lazy(() => import("./components/SignatureExperience"));
const Franchise = lazy(() => import("./components/Franchise"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));
const FAQ = lazy(() => import("./components/FAQ"));

function App() {
  // Initialize Lenis smooth scroll
  useLenis();
  // Initialize vanilla scroll reveal animation system
  useScrollReveal();


  // Routing State management
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

      // Smooth scroll target resolution if a sub-hash section exists on the page
      setTimeout(() => {
        const scrollTarget = document.getElementById(page);
        
        if (scrollTarget) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(scrollTarget, { offset: page === 'faq' ? -100 : 0 });
          } else {
            scrollTarget.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 50);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Force scroll to top on page change
  useEffect(() => {
    requestAnimationFrame(() => {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    });
  }, [currentPage]);

  return (
    <>
      <Preloader />
      
      <Layout>
        <Navbar />
        
        <main className={`flex-1 flex flex-col ${currentPage !== 'home' ? 'pt-8 md:pt-10' : ''}`}>
          {currentPage === "home" && (
            <>
              <Hero />
              <About isHomePage={true} />
              <Testimonials />
              <FranchiseSection />
              <FranchiseTeaser />
            </>
          )}

          {currentPage === "specials" && (
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-plum border-t-transparent animate-spin" /></div>}>
              <Specials />
            </Suspense>
          )}

          {currentPage === "about" && (
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-plum border-t-transparent animate-spin" /></div>}>
              <About />
              <MissionVision />
              <Vision2030 />
              <SignatureExperience />
            </Suspense>
          )}

          {currentPage === "franchise" && (
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-plum border-t-transparent animate-spin" /></div>}>
              <Franchise />
              <FranchiseSection />
            </Suspense>
          )}

          {currentPage === "gallery" && (
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-plum border-t-transparent animate-spin" /></div>}>
              <Gallery />
            </Suspense>
          )}

          {currentPage === "contact" && (
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-plum border-t-transparent animate-spin" /></div>}>
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