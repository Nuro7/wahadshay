import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-beige text-plum-dark">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;