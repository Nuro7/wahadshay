import { useState } from "react";
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

function App() {
  // Initialize Lenis smooth scroll
  useLenis();
  // Initialize vanilla scroll reveal animation system
  useScrollReveal();

  // Currency State management
  const [currency, setCurrency] = useState<"AED" | "SAR">("AED");

  return (
    <>
      <Preloader />
      
      <Layout>
        <Navbar 
          currency={currency}
          onCurrencyChange={(curr) => setCurrency(curr)}
        />
        
        <main>
          <Hero />
          <About />
          <SignatureExperience />
          <Menu currency={currency} />
          <Specials currency={currency} />
          <Franchise />
          <FranchiseSection />
          <Testimonials />
          <Gallery />
          <VideoGallery />
          <FAQ />
          <Contact />
        </main>
        
        <Footer />
      </Layout>
    </>
  );
}

export default App;