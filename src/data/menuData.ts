import parathaImg from "../assets/hot_chicken.jpg";
import indomieImg from "../assets/hot_chicken_rice.jpg";
import burgerSpImg from "../assets/hot_chicken_burger.jpg";
import comboImg from "../assets/mini_bites.jpg";
import wrapImg from "../assets/juicy_dip.jpg";
import plateImg from "../assets/hot_chicken_rice.jpg";
import wahadImg from "../assets/hot_chicken.jpg";
import saladImg from "../assets/mini_bites.jpg";
import soupImg from "../assets/hot_chicken_rice.jpg";
import juiceImg from "../assets/juicy_dip.jpg";
import milkshakeImg from "../assets/hot_chicken_burger.jpg";
import dessertImg from "../assets/mini_bites.jpg";

export interface Product {
  id: string;
  name: string;
  arabicName?: string;
  price: number;
  image: string;
  description: string;
  arabicDescription?: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  arabicName?: string;
  image?: string;
  heroImage: string;
  heroVideo?: string;
  products: Product[];
  transitionStyle?: "depth" | "fade" | "liquid" | "steam" | "floating";
}

// Dummy data structure until PDF is fully processed
export const menuCategories: Category[] = [
  {
    id: "paratha-sandwiches",
    name: "Paratha Sandwiches",
    arabicName: "سندويشات باراثا",
    heroImage: parathaImg,
    transitionStyle: "depth",
    products: [
      { id: "ps1", name: "Paratha 1", arabicName: "باراثا 1", price: 10, image: parathaImg, description: "Demo description for Paratha 1", arabicDescription: "وصف تجريبي لباراثا 1", featured: true },
      { id: "ps2", name: "Paratha 2", arabicName: "باراثا 2", price: 12, image: parathaImg, description: "Demo description for Paratha 2", arabicDescription: "وصف تجريبي لباراثا 2", featured: false },
      { id: "ps3", name: "Paratha 3", arabicName: "باراثا 3", price: 15, image: parathaImg, description: "Demo description for Paratha 3", arabicDescription: "وصف تجريبي لباراثا 3", featured: false }
    ]
  },
  {
    id: "indomie-noodles",
    name: "Inomie Noodles",
    arabicName: "نودلز إندومي",
    heroImage: indomieImg,
    transitionStyle: "fade",
    products: [
      { id: "in1", name: "Indomie 1", arabicName: "إندومي 1", price: 12, image: indomieImg, description: "Demo description for Indomie 1", arabicDescription: "وصف تجريبي لإندومي 1", featured: true },
      { id: "in2", name: "Indomie 2", arabicName: "إندومي 2", price: 14, image: indomieImg, description: "Demo description for Indomie 2", arabicDescription: "وصف تجريبي لإندومي 2", featured: false }
    ]
  },
  {
    id: "special-burgers",
    name: "Special Burgers",
    arabicName: "برغر خاص",
    heroImage: burgerSpImg,
    name: "Combo Sandwich",
    heroImage: comboImg,
    transitionStyle: "floating",
    products: [
      { id: "cs1", name: "Combo 1", price: 35, image: comboImg, description: "Demo description for Combo 1", featured: true },
      { id: "cs2", name: "Combo 2", price: 40, image: comboImg, description: "Demo description for Combo 2", featured: false },
      { id: "cs3", name: "Combo 3", price: 45, image: comboImg, description: "Demo description for Combo 3", featured: false }
    ]
  },
  {
    id: "wrap-sandwich",
    name: "Wrap Sandwich",
    heroImage: wrapImg,
    transitionStyle: "depth",
    products: [
      { id: "ws1", name: "Wrap 1", price: 20, image: wrapImg, description: "Demo description for Wrap 1", featured: true },
      { id: "ws2", name: "Wrap 2", price: 22, image: wrapImg, description: "Demo description for Wrap 2", featured: false },
      { id: "ws3", name: "Wrap 3", price: 25, image: wrapImg, description: "Demo description for Wrap 3", featured: false }
    ]
  },
  {
    id: "plate-item",
    name: "Plate Item",
    heroImage: plateImg,
    transitionStyle: "floating",
    products: [
      { id: "pi1", name: "Plate 1", price: 30, image: plateImg, description: "Demo description for Plate 1", featured: true },
      { id: "pi2", name: "Plate 2", price: 35, image: plateImg, description: "Demo description for Plate 2", featured: false },
      { id: "pi3", name: "Plate 3", price: 40, image: plateImg, description: "Demo description for Plate 3", featured: false }
    ]
  },
  {
    id: "wahad-special",
    name: "WAHAD SPECIAL",
    heroImage: wahadImg,
    transitionStyle: "depth",
    products: [
      { id: "wsp1", name: "Special 1", price: 50, image: wahadImg, description: "Demo description for Special 1", featured: true },
      { id: "wsp2", name: "Special 2", price: 55, image: wahadImg, description: "Demo description for Special 2", featured: false },
      { id: "wsp3", name: "Special 3", price: 60, image: wahadImg, description: "Demo description for Special 3", featured: false }
    ]
  },
  {
    id: "salad",
    name: "SALAD",
    heroImage: saladImg,
    transitionStyle: "floating",
    products: [
      { id: "sa1", name: "Salad 1", price: 15, image: saladImg, description: "Demo description for Salad 1", featured: true },
      { id: "sa2", name: "Salad 2", price: 18, image: saladImg, description: "Demo description for Salad 2", featured: false },
      { id: "sa3", name: "Salad 3", price: 20, image: saladImg, description: "Demo description for Salad 3", featured: false }
    ]
  },
  {
    id: "soup",
    name: "SOUP",
    heroImage: soupImg,
    transitionStyle: "steam",
    products: [
      { id: "so1", name: "Soup 1", price: 12, image: soupImg, description: "Demo description for Soup 1", featured: true },
      { id: "so2", name: "Soup 2", price: 15, image: soupImg, description: "Demo description for Soup 2", featured: false },
      { id: "so3", name: "Soup 3", price: 18, image: soupImg, description: "Demo description for Soup 3", featured: false }
    ]
  },
  {
    id: "juices",
    name: "JUICES",
    heroImage: juiceImg,
    transitionStyle: "liquid",
    products: [
      { id: "j1", name: "Juice 1", price: 10, image: juiceImg, description: "Demo description for Juice 1", featured: true },
      { id: "j2", name: "Juice 2", price: 12, image: juiceImg, description: "Demo description for Juice 2", featured: false },
      { id: "j3", name: "Juice 3", price: 15, image: juiceImg, description: "Demo description for Juice 3", featured: false }
    ]
  },
  {
    id: "milk-shake",
    name: "MILK SHAKE",
    heroImage: milkshakeImg,
    transitionStyle: "liquid",
    products: [
      { id: "ms1", name: "Milkshake 1", price: 15, image: milkshakeImg, description: "Demo description for Milkshake 1", featured: true },
      { id: "ms2", name: "Milkshake 2", price: 18, image: milkshakeImg, description: "Demo description for Milkshake 2", featured: false },
      { id: "ms3", name: "Milkshake 3", price: 20, image: milkshakeImg, description: "Demo description for Milkshake 3", featured: false }
    ]
  },
  {
    id: "desserts",
    name: "DESSERTS",
    heroImage: dessertImg,
    transitionStyle: "depth",
    products: [
      { id: "d1", name: "Dessert 1", price: 20, image: dessertImg, description: "Demo description for Dessert 1", featured: true },
      { id: "d2", name: "Dessert 2", price: 25, image: dessertImg, description: "Demo description for Dessert 2", featured: false },
      { id: "d3", name: "Dessert 3", price: 30, image: dessertImg, description: "Demo description for Dessert 3", featured: false }
    ]
  }
];
