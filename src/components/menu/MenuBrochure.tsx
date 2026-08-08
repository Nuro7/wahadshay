import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Pizza, Coffee, Croissant, Beef, Sandwich, Salad, ChefHat, IceCream } from "lucide-react";
import burgerImg from "../../assets/demo/burger.png";
import parathaImg from "../../assets/demo/paratha.png";
import indomieImg from "../../assets/demo/indomie.png";
import comboImg from "../../assets/demo/combo.png";
import wrapImg from "../../assets/demo/wrap.png";
import plateImg from "../../assets/demo/plate.png";
import wahadImg from "../../assets/demo/wahad.png";

// Reusing some demo images to represent the items in the brochure
const P06_BURGER = burgerImg;
const P07_MAC = wrapImg; // Placeholder
const P07_MINI_BITES = comboImg; // Placeholder
const P08_PASTA = plateImg; // Placeholder
const P08_CHICKEN = wahadImg; // Placeholder

const PARATHAS = [
  { name: "Zinger Loaded Fries", img: indomieImg },
  { name: "Masaka Paratha", img: parathaImg },
  { name: "Kabab Paratha", img: wrapImg },
  { name: "Chicken Lemon Paratha", img: wrapImg },
  { name: "Prawns Paratha", img: wrapImg },
  { name: "Mathafi Paratha", img: wrapImg },
  { name: "Wahad Shay Platinum Paratha", img: wrapImg },
  { name: "Nuggets Paratha", img: wrapImg },
  { name: "Dynamite Paratha", img: wrapImg },
  { name: "Chicken Chilli Paratha", img: wrapImg },
  { name: "Pubg Paratha", img: wrapImg },
  { name: "Francisco Paratha", img: wrapImg },
  { name: "Zinger Paratha", img: wrapImg },
];

const FoodPattern = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 flex flex-wrap gap-24 items-center justify-center -z-10">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="flex gap-24">
        <Pizza size={64} className="rotate-12" />
        <Coffee size={64} className="-rotate-12" />
        <Croissant size={64} className="rotate-45" />
        <Beef size={64} className="-rotate-45" />
        <Sandwich size={64} className="rotate-12" />
        <Salad size={64} className="-rotate-12" />
        <IceCream size={64} className="rotate-45" />
        <ChefHat size={64} className="-rotate-45" />
      </div>
    ))}
  </div>
);

// High-end Awwwards-style mouse parallax component
const MagneticImage = ({ src, alt, className = "", imgClassName = "" }: { src: string, alt: string, className?: string, imgClassName?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-smooth spring physics
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25, mass: 0.5 });

  // Very subtle and premium 3D tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Parallax float effect towards the cursor
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5 based on cursor position in element
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    // Snap back to origin
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative flex items-center justify-center will-change-transform z-20 ${className}`}
    >
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ transform: "translateZ(30px)" }} // Adds extra depth separating image from background
        className={`object-cover pointer-events-none drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)] ${imgClassName}`} 
      />
    </motion.div>
  );
};

export const MenuBrochure: React.FC = () => {
  return (
    <div id="menu" className="w-full text-white font-body selection:bg-yellow selection:text-plum-dark">
      
      {/* -------------------- PAGE 6 -------------------- */}
      {/* Dark Purple */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 bg-[#4a1c6f]">
        <FoodPattern />

        {/* Vertical Text */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center hidden xl:block">
          <span className="font-display font-black text-6xl text-white/5 tracking-widest whitespace-nowrap">
            OUR SIGNATURE ITEMS
          </span>
        </div>

        {/* Big Watermark 01 */}
        <div className="absolute left-24 top-32 font-numbers font-black text-[25rem] text-white/5 leading-none pointer-events-none">
          01
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-8 max-w-xl">
            <h1 className="text-yellow font-display font-black text-5xl md:text-7xl leading-tight">
              Juicy Dip<br />Burger
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              The Juicy Dip Burger is the result of over a year of dedicated research and culinary exploration. Inspired by some of America's most iconic burger brands, we set out to create a unique flavour profile that reimagines the classic burger experience.
            </p>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              What makes the Juicy Dip truly stand out is its innovative approach to moisture and flavour. Unlike traditional burgers that rely on heavy layers of cheese and mayonnaise, the Juicy Dip is entirely cheese and mayo-free. Instead, the star of the show is our specially developed signature sauce...
            </p>
          </div>

          <div className="relative w-full aspect-square max-w-2xl mx-auto group">
            {/* Hexagon Box Mockup (Flat floating) */}
            <div className="absolute inset-0 bg-[#8c52ff] rounded-[3rem] rotate-12 opacity-80 shadow-2xl shadow-plum-dark/50 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-6"></div>
            <div className="absolute inset-0 bg-white/10 rounded-[3rem] -rotate-6 backdrop-blur-sm border border-white/20 flex items-center justify-center p-8 shadow-[20px_40px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-10px]">
               <img src={P06_BURGER} alt="Juicy Dip Burger" className="w-full h-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- PAGE 7 -------------------- */}
      {/* Light Purple */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24 bg-[#6b339f]">
        <FoodPattern />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 w-full flex flex-col gap-24">
          
          {/* Section 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            <div className="absolute right-0 top-0 font-numbers font-black text-[20rem] text-white/5 leading-none pointer-events-none translate-x-12 -translate-y-12">
              02
            </div>
            <div className="flex flex-col gap-6 relative z-10">
              <h2 className="text-yellow font-display font-black text-5xl md:text-6xl">Mac & Cheese with Chicken</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Indulge in our signature Mac & Cheese with Chicken, a perfect harmony of comfort and crunch. This dish features a base of exceptionally rich and creamy macaroni and cheese...
              </p>
              <p className="text-white/90 text-lg leading-relaxed">
                What sets our version apart is the topping: our house-made Zinger chicken. We take pride in using our own unique blend of spices and a specialized coating process to ensure the chicken is perfectly seasoned...
              </p>
            </div>
            <div className="relative w-full max-w-lg mx-auto aspect-video bg-white/5 rounded-[3rem] overflow-visible shadow-[20px_30px_50px_rgba(0,0,0,0.4)] group">
              <div className="w-full h-full transition-transform duration-700 rounded-[3rem] overflow-hidden border-2 border-white/20 group-hover:scale-105 group-hover:translate-y-[-10px]">
                <img src={P07_MAC} alt="Mac & Cheese" className="w-full h-full object-cover scale-110" />
              </div>
            </div>
          </div>

          {/* Section 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative flex-col-reverse lg:flex-row">
            <div className="absolute left-0 bottom-0 font-numbers font-black text-[20rem] text-white/5 leading-none pointer-events-none -translate-x-12 translate-y-12">
              03
            </div>
            <div className="relative w-full max-w-sm mx-auto aspect-square order-2 lg:order-1 group">
              <div className="w-full h-full transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-10px]">
                 <img src={P07_MINI_BITES} alt="Mini Bites" className="w-full h-full object-contain drop-shadow-[0_40px_30px_rgba(0,0,0,0.6)]" />
              </div>
            </div>
            <div className="flex flex-col gap-6 relative z-10 order-1 lg:order-2">
              <h2 className="text-yellow font-display font-black text-5xl md:text-6xl">Mini Bites</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Our Mini Bites are a vibrant and playful addition to our menu, specifically designed to delight our youngest guests. These kid-friendly treats feature an eye-catching presentation...
              </p>
              <p className="text-white/90 text-lg leading-relaxed">
                To elevate the fun, these bites are served with a unique signature dip, encouraging a hands-on dining experience that kids love. Combining visual flair with delicious flavours...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- PAGE 8 -------------------- */}
      {/* Dark Purple */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24 bg-[#4a1c6f]">
         <FoodPattern />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Section 04 */}
          <div className="flex flex-col gap-6 relative">
            <div className="absolute left-0 top-1/4 font-numbers font-black text-[25rem] text-white/5 leading-none pointer-events-none -translate-x-1/2 -translate-y-1/4">
              04
            </div>
            
            <div className="w-full max-w-sm mx-auto aspect-square bg-white/5 rounded-[3rem] border-2 border-white/20 overflow-visible mb-4 shadow-[20px_30px_50px_rgba(0,0,0,0.5)] relative z-10 group">
              <div className="w-full h-full rounded-[3rem] overflow-hidden transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-10px]">
                 <img src={P08_PASTA} alt="Alfredo Penne Pasta" className="w-full h-full object-cover" />
              </div>
            </div>

            <h2 className="text-yellow font-display font-black text-5xl md:text-6xl relative z-10">Alfredo<br/>Penne Pasta</h2>
            <p className="text-white/90 text-lg leading-relaxed relative z-10">
              Our Alfredo Penne Pasta is the ultimate expression of Italian-inspired comfort. We toss perfectly al dente penne in a silky, handcrafted Alfredo sauce made from a rich blend...
            </p>
            <p className="text-white/90 text-lg leading-relaxed relative z-10">
              To ensure a depth of flavour that lingers, we infuse the sauce with a hint of garlic and subtle aromatic herbs...
            </p>
          </div>

          {/* Section 05 */}
          <div className="flex flex-col gap-6 relative mt-24 lg:mt-0">
            <h2 className="text-yellow font-display font-black text-5xl md:text-6xl relative z-10">Juicy Chicken<br/>with Mashkool Rice</h2>
            <p className="text-white/90 text-lg leading-relaxed relative z-10">
              Experience a flavourful fusion of tradition and technique with our Juicy Chicken with Mashkool Rice. This dish features premium, succulent chicken perfectly seasoned...
            </p>
            <p className="text-white/90 text-lg leading-relaxed relative z-10">
              The chicken is served over a generous bed of authentic Mashkool rice, a fragrant, spiced long-grain rice layered with vibrant flavours and textures...
            </p>

            <div className="relative w-full max-w-md mt-12 z-10">
              <div className="absolute right-0 bottom-0 font-numbers font-black text-[15rem] text-white/5 leading-none pointer-events-none translate-x-12 translate-y-12">
                05
              </div>
              <div className="relative aspect-square transition-transform duration-700 group hover:translate-y-[-10px]">
                 {/* Hexagon Box Flat */}
                 <div className="absolute inset-0 bg-[#8c52ff] rounded-[3rem] rotate-12 opacity-90 shadow-[20px_30px_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-6 border-2 border-white/20 transition-transform duration-700 group-hover:scale-105">
                    <img src={P08_CHICKEN} alt="Chicken Rice" className="w-full h-full object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.6)] -rotate-12" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- PARATHAS (List) -------------------- */}
      <section className="relative w-full min-h-screen flex flex-col items-center py-32 bg-[#4a1c6f] overflow-hidden">
        <FoodPattern />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-24 text-center">
           <h2 className="text-yellow font-display font-black text-6xl md:text-8xl drop-shadow-xl">
             OUR SPECIAL
           </h2>
           <h2 className="text-white font-display font-black text-5xl md:text-7xl -mt-4 drop-shadow-xl">
             PARATHAS
           </h2>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {PARATHAS.map((item, idx) => {
            // Checkerboard pattern for 2 columns: [Yellow, Purple], [Purple, Yellow], [Yellow, Purple]
            const isYellow = idx % 4 === 0 || idx % 4 === 3;
            const bannerBg = isYellow ? "bg-yellow" : "bg-[#6b339f]";
            const textColor = isYellow ? "text-[#4a1c6f]" : "text-yellow";

            return (
              <div key={idx} className={`w-full h-40 md:h-48 rounded-[2rem] md:rounded-[3rem] ${bannerBg} shadow-[0_20px_40px_rgba(0,0,0,0.3)] group cursor-pointer flex overflow-hidden border-0 transition-transform duration-500 hover:scale-[1.02]`}>
                
                {/* Content Left */}
                <div className="flex-1 flex flex-col justify-center pl-8 md:pl-12 pr-6">
                  <h3 className={`${textColor} font-display font-black text-2xl md:text-4xl leading-tight`}>
                    {item.name}
                  </h3>
                </div>

                {/* Photo Right (Flush inside the same rectangle) */}
                <div className="w-[45%] h-full relative [perspective:1200px]">
                   <MagneticImage src={item.img} alt={item.name} className="w-full h-full" imgClassName="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default MenuBrochure;
