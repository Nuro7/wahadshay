import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Menu from "./components/Menu";
import Specials from "./components/Specials";
import Franchise from "./components/Franchise";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useLenis from "./hooks/useLenis";

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Specials />
        <Franchise />
        <Contact />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;