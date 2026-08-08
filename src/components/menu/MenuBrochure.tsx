import React from "react";
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

export const MenuBrochure: React.FC = () => {
  return (
    <div id="menu" className="w-full bg-[#522378] text-white font-body selection:bg-yellow selection:text-plum-dark">
      
      {/* -------------------- PAGE 6 -------------------- */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 border-b border-plum">
        {/* Top Header */}
        <div className="absolute top-12 left-0 right-0 px-12 md:px-24 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-yellow font-display font-black text-3xl leading-none">Wahad<br/>shay</h2>
            <div className="h-px bg-white/20 flex-grow ml-8 mr-12"></div>
            <div className="w-48 h-6 bg-yellow rounded-l-full relative right-[-3rem]"></div>
          </div>
        </div>

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

          <div className="relative w-full aspect-square max-w-2xl mx-auto">
            {/* Hexagon Box Mockup (Placeholder) */}
            <div className="absolute inset-0 bg-[#8c52ff] rounded-[3rem] rotate-12 opacity-80 shadow-2xl shadow-plum-dark/50"></div>
            <div className="absolute inset-0 bg-white/10 rounded-[3rem] -rotate-6 backdrop-blur-sm border border-white/20 flex items-center justify-center p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
               <img src={P06_BURGER} alt="Juicy Dip Burger" className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-8 left-12 md:left-24 font-display font-bold text-yellow text-xl">
          P06
        </div>
        
        {/* Bottom Yellow Wave (Simplified) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-yellow rounded-t-[50%] translate-y-8"></div>
      </section>

      {/* -------------------- PAGE 7 -------------------- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24 border-b border-plum">
        {/* Top Header */}
        <div className="absolute top-12 left-0 right-0 px-12 md:px-24 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <div className="w-48 h-6 bg-yellow rounded-r-full relative left-[-3rem]"></div>
            <div className="h-px bg-white/20 flex-grow ml-12 mr-8"></div>
            <h2 className="text-yellow font-display font-black text-3xl leading-none text-right">Wahad<br/>shay</h2>
          </div>
        </div>

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
            <div className="relative w-full max-w-lg mx-auto aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl rotate-3">
              <img src={P07_MAC} alt="Mac & Cheese" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Section 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative flex-col-reverse lg:flex-row">
            <div className="absolute left-0 bottom-0 font-numbers font-black text-[20rem] text-white/5 leading-none pointer-events-none -translate-x-12 translate-y-12">
              03
            </div>
            <div className="relative w-full max-w-sm mx-auto aspect-square order-2 lg:order-1">
              <img src={P07_MINI_BITES} alt="Mini Bites" className="w-full h-full object-contain drop-shadow-2xl" />
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

        {/* Page Number */}
        <div className="absolute bottom-8 right-12 md:right-24 font-display font-bold text-yellow text-xl">
          P07
        </div>
        
        {/* Bottom Yellow Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-yellow rounded-t-full translate-y-6 opacity-80"></div>
      </section>

      {/* -------------------- PAGE 8 -------------------- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24 border-b border-plum">
         {/* Top Header */}
         <div className="absolute top-12 left-0 right-0 px-12 md:px-24 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-yellow font-display font-black text-3xl leading-none">Wahad<br/>shay</h2>
            <div className="h-px bg-white/20 flex-grow ml-8 mr-12"></div>
            <div className="w-48 h-6 bg-yellow rounded-l-full relative right-[-3rem]"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Section 04 */}
          <div className="flex flex-col gap-6 relative">
            <div className="absolute left-0 top-1/4 font-numbers font-black text-[25rem] text-white/5 leading-none pointer-events-none -translate-x-1/2 -translate-y-1/4">
              04
            </div>
            
            <div className="w-full max-w-sm aspect-square bg-black/20 rounded-full border-4 border-plum-dark overflow-hidden mb-4 shadow-2xl relative z-10">
              <img src={P08_PASTA} alt="Alfredo Penne Pasta" className="w-full h-full object-cover" />
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
              <div className="relative aspect-square">
                 {/* Hexagon Box */}
                 <div className="absolute inset-0 bg-[#8c52ff] rounded-3xl -rotate-6 opacity-90 shadow-2xl flex items-center justify-center p-6 border-2 border-white/20">
                    <img src={P08_CHICKEN} alt="Chicken Rice" className="w-full h-full object-contain drop-shadow-2xl" />
                 </div>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-12 md:left-24 font-display font-bold text-yellow text-xl">
          P08
        </div>
      </section>

      {/* -------------------- PAGE 9 (Parathas Grid 1) -------------------- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 border-b border-plum">
        {/* Top Header */}
        <div className="absolute top-12 left-0 right-0 px-12 md:px-24 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <div className="w-48 h-6 bg-yellow rounded-r-full relative left-[-3rem]"></div>
            <div className="h-px bg-white/20 flex-grow ml-12 mr-8"></div>
            <h2 className="text-yellow font-display font-black text-3xl leading-none text-right">Wahad<br/>shay</h2>
          </div>
        </div>

        {/* Big Yellow Stripes in Background */}
        <div className="absolute top-[30%] left-0 right-0 h-24 bg-yellow/90 -z-10"></div>
        <div className="absolute top-[65%] left-0 right-0 h-24 bg-yellow/90 -z-10"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-32">
            {PARATHAS.slice(0, 8).map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-40 h-40 md:w-48 md:h-48 relative mb-8">
                  {/* Purple Wrapping/Holder Graphic Placeholder */}
                  <div className="absolute inset-x-2 -bottom-4 top-12 bg-plum border-2 border-white/20 rounded-b-xl shadow-lg -rotate-[15deg] group-hover:-rotate-6 transition-transform duration-500"></div>
                  
                  <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 origin-bottom" />
                </div>
                <h3 className="text-white font-display font-bold text-xl text-center leading-tight">
                  {item.name.split(" ").map((word, i) => (
                    <React.Fragment key={i}>{word}<br/></React.Fragment>
                  ))}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-12 md:right-24 font-display font-bold text-yellow text-xl">
          P09
        </div>
      </section>

      {/* -------------------- PAGE 10 (Parathas Grid 2) -------------------- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-32">
        {/* Top Header */}
        <div className="absolute top-12 left-0 right-0 px-12 md:px-24 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-yellow font-display font-black text-3xl leading-none">Wahad<br/>shay</h2>
            <div className="h-px bg-white/20 flex-grow ml-8 mr-12"></div>
            <div className="w-48 h-6 bg-yellow rounded-l-full relative right-[-3rem]"></div>
          </div>
        </div>

        {/* Big Yellow Stripes in Background */}
        <div className="absolute top-[35%] left-0 right-0 h-24 bg-yellow/90 -z-10"></div>
        <div className="absolute top-[70%] left-0 right-0 h-24 bg-yellow/90 -z-10"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-32">
            {PARATHAS.slice(8).map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group w-[40%] md:w-[25%]">
                <div className="w-40 h-40 md:w-48 md:h-48 relative mb-8">
                  {/* Purple Wrapping/Holder Graphic Placeholder */}
                  <div className="absolute inset-x-2 -bottom-4 top-12 bg-plum border-2 border-white/20 rounded-b-xl shadow-lg -rotate-[15deg] group-hover:-rotate-6 transition-transform duration-500"></div>
                  
                  <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 origin-bottom" />
                </div>
                <h3 className="text-white font-display font-bold text-xl text-center leading-tight">
                  {item.name.split(" ").map((word, i) => (
                    <React.Fragment key={i}>{word}<br/></React.Fragment>
                  ))}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Yellow/Purple Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-[120%] h-32 bg-yellow rounded-tr-[100%] translate-y-12 -translate-x-12 opacity-90 -z-10"></div>
      </section>

    </div>
  );
};

export default MenuBrochure;
