import { useState, useEffect } from "react";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/About";
import MissionVision from "./components/MissionVision";
import Vision2030 from "./components/Vision2030";
import SignatureExperience from "./components/SignatureExperience";
import Menu from "./components/Menu";
import MenuBrochure from "./components/menu/MenuBrochure";
import Specials from "./components/Specials";
import Franchise from "./components/Franchise";
import FranchiseSection from "./components/FranchiseSection";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/layout/Preloader";
import useLenis from "./hooks/useLenis";
import useScrollReveal from "./hooks/useScrollReveal";

// Import new featured/teaser components
import FranchiseTeaser from "./components/FranchiseTeaser";

function App() {
  // Initialize Lenis smooth scroll
  useLenis();
  // Initialize vanilla scroll reveal animation system
  useScrollReveal();

  // Currency State management
  const [currency, setCurrency] = useState<"AED" | "SAR">("AED");

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
      } else if (["specials"].includes(page)) {
        targetPage = "specials";
      } else if (["about"].includes(page)) {
        targetPage = "about";
      } else if (["menu"].includes(page)) {
        targetPage = "menu";
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
        
        <main className="flex-1 flex flex-col">
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
            <>
              <Specials currency={currency} />
            </>
          )}

          {currentPage === "about" && (
            <>
              <About />
              <MissionVision />
              <Vision2030 />
              <SignatureExperience />
            </>
          )}

          {currentPage === "menu" && (
            <>
              <Menu currency={currency} />
            </>
          )}

          {currentPage === "franchise" && (
            <>
              <Franchise />
              <FranchiseSection />
            </>
          )}

          {currentPage === "gallery" && (
            <>
              <Gallery />
            </>
          )}

          {currentPage === "contact" && (
            <>
              <Contact />
              <FAQ />
            </>
          )}
        </main>
        
        <Footer />
      </Layout>
    </>
  );
}

export default App;