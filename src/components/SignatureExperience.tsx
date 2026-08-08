import { Coffee, Utensils, Sparkles, Croissant, Dessert } from "lucide-react";

interface ExperienceItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  desc: string;
}

const experiences: ExperienceItem[] = [
  {
    icon: Sparkles,
    title: "Premium Tea",
    desc: "Savor our legendary Karak and rare Saffron infusions, slow-brewed and double-spiced with fresh green cardamom.",
  },
  {
    icon: Coffee,
    title: "Specialty Coffee",
    desc: "Exquisite single-origin beans, cold brews, and iced espresso craft infused with delicate spices and syrups.",
  },
  {
    icon: Croissant,
    title: "Fresh Baked Food",
    desc: "Signature buttery brioches, flaky croissants, and herb-crusted flatbreads baked fresh daily by master bakers.",
  },
  {
    icon: Dessert,
    title: "Decadent Desserts",
    desc: "Warm honey-infused cream scones, sweet glazed buns, and vanilla bean tea gelato pairings.",
  },
  {
    icon: Utensils,
    title: "Luxury Dining",
    desc: "Gather in our quiet, ambient Lounges designed with warm beige textures, perfect for authentic Arabic hospitality.",
  },
];

export function SignatureExperience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-neutral-ivory relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.02),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-16 md:space-y-20">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            Crafted Offerings
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary mask-reveal">
            <span className="text-shimmer">Signature Experience</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body max-w-lg mx-auto">
            From slow-brewed double-spiced Karak to artisan brioche baked fresh every morning.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.title}
                style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group p-6 md:p-8 flex flex-col justify-between h-[300px] relative`}
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-plum scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                <div className="rounded-full bg-beige/40 border border-neutral-border p-3.5 text-plum w-fit mb-6 transition-transform group-hover:scale-105">
                  <Icon size={22} className="stroke-[1.5]" />
                </div>

                <div className="space-y-3 mt-auto">
                  <h3 className="font-display text-lg font-black text-text-primary group-hover:text-plum transition-colors leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed font-body">
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default SignatureExperience;
