import { Star, Quote } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Regular Customer",
    role: "Al Wahda",
    text: "I've visited Wahad Shay Al Wahda a few times now, and what stands out is how different the food feels from the usual café options. The Mac Tower was honestly a surprise—not just in presentation, but in the taste as well. The Mini Bites were also really enjoyable. The staff are friendly, attentive and quick with the service, which makes the whole experience even better. You can tell there's a lot of thought behind both the food and presentation.",
    rating: 5,
  },
  {
    name: "Happy Customer",
    role: "Al Falah",
    text: "I tried Wahad Shay Al Falah recently and really enjoyed the experience. The wraps and sandwiches were fresh, well prepared and had their own unique flavours. Nothing felt ordinary or like a standard fast-food item. I also liked how neatly everything was presented. The service was warm and professional, and the team made sure everything was served properly. Definitely a place I would visit again.",
    rating: 5,
  },
  {
    name: "Satisfied Guest",
    role: "Ajman",
    text: "Wahad Shay has a really nice combination of good food and good service. I tried the burgers and was impressed by the flavour and presentation—they felt different from what you normally get at a café. The food was fresh, portions were good, and the staff were genuinely welcoming. It's clear that Wahad Shay focuses on creating its own style rather than simply serving the usual items.",
    rating: 5,
  },
];

export function Testimonials() {
  const { t, language } = useLanguage();
  const rawList = t('testimonials.items') as Testimonial[];
  const testimonialsList = Array.isArray(rawList) && rawList.length > 0 ? rawList : defaultTestimonials;

  return (
    <section id="testimonials" className="section-padding bg-beige relative overflow-hidden select-none">
      {/* Ambient background glow orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] bg-yellow/5 rounded-full blur-[110px] pointer-events-none animate-pulse" />

      <div className="premium-container relative z-10">

        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            {t('testimonials.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary">
            <span className="text-shimmer">{t('testimonials.title')}</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((item: Testimonial, idx: number) => (
            <div
              key={`testimonial-${language}-${idx}`}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group p-8 md:p-10 flex flex-col justify-between min-h-[300px] relative`}
            >
              {/* Quote Mark Icon Accent with RTL support */}
              <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6 text-plum/10">
                <Quote size={40} className="stroke-[1.5] rtl:scale-x-[-1]" />
              </div>

              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow text-yellow stroke-[1]" />
                ))}
              </div>

              {/* Message */}
              <p className="text-text-primary/85 text-sm leading-relaxed italic font-body my-6 flex-1 text-start">
                "{item.text}"
              </p>

              {/* User Bio */}
              <div className="border-t border-neutral-border pt-4 text-start">
                <h4 className="font-display text-sm font-bold text-plum group-hover:text-plum-dark transition-colors">
                  {item.name}
                </h4>
                <span className="text-[10px] text-text-secondary font-body uppercase font-bold tracking-wider mt-1 block">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
