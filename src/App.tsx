import { useState, useEffect } from "react";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/About";
import SignatureExperience from "./components/SignatureExperience";
import Menu from "./components/Menu";
import Specials from "./components/Specials";
import Franchise from "./components/Franchise";
import FranchiseSection from "./components/FranchiseSection";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import VideoGallery from "./components/VideoGallery";
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
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase() || "#home";
      const page = hash.replace("#", "");

      let targetPage = "home";
      if (["home", "specials"].includes(page)) {
        targetPage = "home";
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
        if (page === "faq") {
          const faqEl = document.getElementById("faq");
          if (faqEl) faqEl.scrollIntoView({ behavior: "smooth" });
        } else if (page === "specials") {
          const specialsEl = document.getElementById("specials");
          if (specialsEl) specialsEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }, 50);
    };

    // Initialize page on load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Preloader />
      
      <Layout>
        <Navbar 
          currency={currency}
          onCurrencyChange={(curr) => setCurrency(curr)}
        />
        
        <main className="flex-1 flex flex-col">
          {currentPage === "home" && (
            <>
              <Hero />
              <Specials currency={currency} />
              <Testimonials />
              <FranchiseTeaser />
            </>
          )}

          {currentPage === "about" && (
            <>
              <About />
              <SignatureExperience />
            </>
          )}

          {currentPage === "menu" && (
            <Menu currency={currency} />
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
              <VideoGallery />
            </>
          )}

          {currentPage === "contact" && (
            <>
              <FAQ />
              <Contact />
            </>
          )}
        </main>
        
        <Footer />
      </Layout>
    </>
  );
}

export default App;