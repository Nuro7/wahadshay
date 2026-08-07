import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Menu from "./components/Menu";
import Specials from "./components/Specials";
import Franchise from "./components/Franchise";
import FranchiseSection from "./components/FranchiseSection";
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

  return (
    <>
      <Preloader />
      <Layout>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Specials />
        <Franchise />
        <FranchiseSection />
        <Contact />
      </main>
      <Footer />
    </Layout>
    </>
  );
}

export default App;