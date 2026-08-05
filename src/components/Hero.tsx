import { Button } from "./ui/Button";
import heroImage from "../assets/hero.png";

export function Hero() {
  return (
    <section
      id="top"
      className="min-h-screen bg-beige text-plum-dark"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-28 pb-16 md:grid-cols-2 md:pt-36">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-plum">
            Handcrafted bread &amp; tea
          </p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-plum md:text-7xl">
            Freshly baked.{" "}
            <span className="text-yellow">Beautifully</span> served.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-plum-dark/70">
            Wahad Shay brings artisan breads and fragrant teas together in one
            cozy corner — slow, warm, and made for sharing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>Explore the Menu</Button>
            <Button variant="secondary">Visit Us</Button>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="Wahad Shay — freshly baked bread and tea"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
