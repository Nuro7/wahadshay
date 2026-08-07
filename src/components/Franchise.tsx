import type React from "react";
import Button from "./ui/Button";

const franchiseSteps = [
  {
    step: "01",
    title: "Submit Inquiry",
    desc: "Fill out our franchise application form and share your business plan, background, and target location.",
  },
  {
    step: "02",
    title: "Market Analysis",
    desc: "Our real estate team helps analyze your selected market demographics and verify the prime retail spot.",
  },
  {
    step: "03",
    title: "Store Setup",
    desc: "Receive comprehensive blueprint layouts, supplier lists, and interior design directions.",
  },
  {
    step: "04",
    title: "Grand Launch",
    desc: "Get initial inventory setups, barista training, marketing support, and celebrate your opening day.",
  },
];

export function Franchise() {
  return (
    <section id="franchise" className="py-24 md:py-32 bg-plum relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-[#aa3bff] rounded-full blur-[160px] opacity-25 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Section Heading & Flex Layout */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
            <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
              Partner With Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white">
              Grow the Wahad Shay Network
            </h2>
            <p className="text-grey text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Join a rapidly expanding brand offering a premium, cozy atmosphere. We supply the operational support, design standards, and proprietary spice blends.
            </p>
          </div>
          <div className="text-center lg:text-right">
            <Button variant="primary" className="shadow-lg">
              Apply for Franchise
            </Button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {franchiseSteps.map((step, idx) => (
            <div
              key={step.step}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              className="reveal glass-card glass-card-hover p-8 flex flex-col justify-between h-[260px]"
            >
              <div className="font-numbers text-4xl font-extrabold text-yellow/30 micro-icon micro-transition">
                {step.step}
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold text-white micro-title micro-transition">
                  {step.title}
                </h3>
                <p className="text-grey text-xs md:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Franchise;
