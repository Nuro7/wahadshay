import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";
import cheeseImg from "../assets/cheese_dripping.png";
import friesImg from "../assets/loaded_fries.png";
import herbsImg from "../assets/floating_herbs.png";
import chilliImg from "../assets/flying_chilli.png";

export interface Product {
  id: string;
  name: string;
  arabicName?: string;
  price: number;
  image: string;
  description: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  heroImage: string;
  heroVideo?: string;
  products: Product[];
  transitionStyle?: "depth" | "fade" | "liquid" | "steam" | "floating";
}

// Dummy data structure until PDF is fully processed
export const menuCategories: Category[] = [
  {
    id: "tea",
    name: "TEA",
    heroImage: teacupImg,
    transitionStyle: "steam",
    products: [
      {
        id: "t1",
        name: "Karak Special",
        arabicName: "كرك سبيشال",
        price: 12,
        image: teacupImg,
        description: "Strong, slow-brewed black tea with milk, fresh crushed cardamom, and saffron.",
        featured: true
      },
      {
        id: "t2",
        name: "Mint Suleimani",
        arabicName: "سليماني نعناع",
        price: 10,
        image: teacupImg,
        description: "Clear black tea brewed with fresh spearmint leaves and a splash of lemon.",
        featured: false
      }
    ]
  },
  {
    id: "burgers",
    name: "BURGERS",
    heroImage: burgerImg,
    transitionStyle: "depth",
    products: [
      {
        id: "b1",
        name: "Juicy Dip Burger",
        arabicName: "جوسي ديب برجر",
        price: 35,
        image: burgerImg,
        description: "Signature double beef patty, melted cheddar, caramelised onions, with our secret dip sauce.",
        featured: true
      },
      {
        id: "b2",
        name: "Zinger Supreme",
        arabicName: "زنجر سوبريم",
        price: 28,
        image: burgerImg,
        description: "Crispy chicken breast, signature sauce, fresh lettuce in a toasted bun.",
        featured: true
      }
    ]
  },
  {
    id: "paratha",
    name: "PARATHA",
    heroImage: cheeseImg,
    transitionStyle: "depth",
    products: [
      {
        id: "p1",
        name: "Oman Chips Paratha",
        arabicName: "براتا بطاطس عمان",
        price: 10,
        image: cheeseImg,
        description: "Flaky layered flatbread stuffed with crushed Oman chips and kraft cheese.",
        featured: true
      },
      {
        id: "p2",
        name: "Egg & Cheese Paratha",
        arabicName: "براتا بيض وجبن",
        price: 12,
        image: cheeseImg,
        description: "Freshly pan-fried egg with melted cheddar cheese in a crispy paratha.",
        featured: false
      }
    ]
  },
  {
    id: "specials",
    name: "SPECIALS",
    heroImage: friesImg, // placeholder
    transitionStyle: "floating",
    products: [
      {
        id: "s1",
        name: "Mac & Cheese with Chicken",
        arabicName: "ماك اند تشيز بالدجاج",
        price: 42,
        image: cheeseImg,
        description: "Creamy baked macaroni and cheese topped with crispy fried chicken bites.",
        featured: true
      },
      {
        id: "s2",
        name: "Dynamite Fries",
        arabicName: "بطاطس ديناميت",
        price: 25,
        image: friesImg,
        description: "Crispy fries loaded with cheese sauce, jalapenos, and dynamite chicken pops.",
        featured: true
      }
    ]
  }
];
