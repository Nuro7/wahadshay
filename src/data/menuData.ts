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

// Dummy data structure until PDF is uploaded
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
        name: "Zinger Supreme",
        arabicName: "زنجر سوبريم",
        price: 14,
        image: burgerImg,
        description: "Crispy chicken breast, signature sauce, fresh lettuce in a toasted bun.",
        featured: true
      },
      {
        id: "b2",
        name: "Royal Truffle Burger",
        arabicName: "رويال ترافل برجر",
        price: 38,
        image: cheeseImg,
        description: "Wagyu beef patty with truffle mayo, cheddar cheese, and fresh brioche.",
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
        name: "Cheese Paratha",
        arabicName: "براتا جبن",
        price: 8,
        image: cheeseImg,
        description: "Flaky layered flatbread stuffed with melted kraft cheese.",
        featured: true
      }
    ]
  },
  {
    id: "juices",
    name: "FRESH JUICES",
    heroImage: herbsImg, // placeholder
    transitionStyle: "liquid",
    products: [
      {
        id: "j1",
        name: "Fresh Orange Juice",
        arabicName: "عصير برتقال طازج",
        price: 15,
        image: herbsImg,
        description: "100% cold-pressed organic local oranges served over crushed ice.",
        featured: true
      }
    ]
  },
  {
    id: "desserts",
    name: "DESSERTS",
    heroImage: friesImg, // placeholder
    transitionStyle: "floating",
    products: [
      {
        id: "d1",
        name: "Saffron Milk Cake",
        arabicName: "كيكة الحليب بالزعفران",
        price: 28,
        image: herbsImg,
        description: "Sponge cake soaked in rich saffron milk and topped with vanilla whip.",
        featured: true
      }
    ]
  }
];
