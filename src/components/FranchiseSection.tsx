// FranchiseSection.tsx
// Starter component for Wahad Shay franchise section.
// Install: npm i framer-motion lucide-react

"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Clock3 } from "lucide-react";

const branches = [
  { city:"Ajman", area:"Al Jurf", status:"Open", x:"55%", y:"48%"},
  { city:"Dubai", area:"Al Barsha", status:"Coming Soon", x:"58%", y:"58%"},
  { city:"Sharjah", area:"Muwaileh", status:"Coming Soon", x:"60%", y:"53%"},
  { city:"Abu Dhabi", area:"Al Falah", status:"Open", x:"42%", y:"63%"},
];

export default function FranchiseSection(){
  return (
    <section className="bg-[#090909] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Wahad Shay</p>
          <h2 className="text-5xl font-bold mt-3">Our Franchise Network</h2>
          <p className="text-gray-400 mt-4">Growing across the UAE.</p>
        </div>

        <div className="relative mx-auto max-w-4xl h-[520px] rounded-3xl border border-[#D4AF37]/20 bg-[#111] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,.08),transparent_70%)]"/>

          {/* Replace with your UAE SVG */}
          <div className="absolute inset-0 flex items-center justify-center text-[#333] text-4xl font-bold">
            UAE MAP SVG HERE
          </div>

          {branches.map((b,i)=>(
            <motion.div
              key={b.city}
              initial={{scale:0}}
              whileInView={{scale:1}}
              transition={{delay:i*0.15}}
              className="absolute"
              style={{left:b.x,top:b.y}}
            >
              <div className="relative">
                <span className="absolute -inset-3 rounded-full bg-[#D4AF37]/30 animate-ping"/>
                <MapPin className="relative text-[#D4AF37]" size={28}/>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {branches.map((b)=>(
            <motion.div whileHover={{y:-8}} key={b.city}
              className="rounded-3xl border border-[#D4AF37]/20 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-2xl font-bold">{b.city}</h3>
              <p className="text-gray-400">{b.area}</p>

              <div className="mt-5">
                {b.status==="Open" ? (
                  <span className="inline-flex items-center gap-2 text-green-400">
                    <CheckCircle2 size={18}/> OPEN
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-yellow-400">
                    <Clock3 size={18}/> COMING SOON
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
