import type React from "react";
import Button from "./ui/Button";

export function FranchiseTeaser() {
  return (
    <section className="py-24 bg-neutral-ivory border-t border-neutral-border/40 relative overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-plum/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[250px] h-[250px] bg-yellow/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="reveal grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Column: Heading and info */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
              Partner With Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary leading-tight">
              <span className="text-shimmer">Join the Wahad Shay</span> <br />
              <span className="text-plum font-extrabold">Luxury Franchise Network</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-body max-w-xl mx-auto lg:mx-0">
              Become part of a rapidly growing premium tea lounge network in the UAE. We provide comprehensive operational support, luxury interior blueprints, and our signature Malabar spice blends.
            </p>
            
            {/* Action CTA */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <a href="#franchise">
                <Button variant="primary" className="shadow-[0_4px_15px_rgba(245,189,32,0.15)]">
                  Explore Interactive Network Map
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Statistics grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 w-full">
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-plum">4 Outlets</span>
              <span className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mt-1">Active Outlets</span>
            </div>
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-plum">12.5K+</span>
              <span className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mt-1">Weekly Guests</span>
            </div>
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-plum">+45% YOY</span>
              <span className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mt-1">Growth Rate</span>
            </div>
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-yellow-600">Premium</span>
              <span className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mt-1">Academy Training</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FranchiseTeaser;
