import type React from "react";
import Button from "./ui/Button";

const franchiseSteps = [
  {
    step: "01",
    title: "Submit Inquiry",
    desc: "Fill out our franchise application form with details on your background, business experience, and proposed territory.",
  },
  {
    step: "02",
    title: "Market Feasibility",
    desc: "Our real estate analysis team assists in studying local demographics, verifying footfall, and selecting premium retail nodes.",
  },
  {
    step: "03",
    title: "Lounge Construction",
    desc: "Receive bespoke aesthetic layout blueprints, approved contractor lists, and luxury interior design blueprints.",
  },
  {
    step: "04",
    title: "Inaugural Launch",
    desc: "Deploy initial inventory packages, execute coffee/tea academy training, and celebrate your lounge's grand opening.",
  },
];

export function Franchise() {
  return (
    <section id="franchise" className="py-24 md:py-32 bg-beige relative overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-yellow/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading & Flex Layout */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
            <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
              Partner With Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-text-primary leading-tight mask-reveal">
              <span className="text-shimmer">Grow the Wahad Shay</span> <br />
              <span className="text-plum">Luxury Network</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
              Join a rapidly expanding brand offering a premium, cozy atmosphere. We supply the operational support, design standards, and proprietary spice blends.
            </p>
          </div>
          <div className="text-center lg:text-right">
            <a href="#contact">
              <Button variant="primary" className="shadow-[0_4px_15px_rgba(245,189,32,0.1)]">
                Apply for Franchise
              </Button>
            </a>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {franchiseSteps.map((step, idx) => (
            <div
              key={step.step}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group p-8 flex flex-col justify-between h-[270px] relative`}
            >
              {/* Animated hover top border indicator */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-plum to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />

              <div className="font-numbers text-4xl font-black text-plum/15 group-hover:text-plum/30 transition-colors duration-300">
                {step.step}
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-plum transition-colors leading-tight">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-body">
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
