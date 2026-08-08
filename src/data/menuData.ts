import parathaImg from "../assets/demo/paratha.png";
import indomieImg from "../assets/demo/indomie.png";
import burgerSpImg from "../assets/demo/burger.png";
import comboImg from "../assets/demo/combo.png";
import wrapImg from "../assets/demo/wrap.png";
import plateImg from "../assets/demo/plate.png";
import wahadImg from "../assets/demo/wahad.png";
import saladImg from "../assets/demo/salad.png";
import soupImg from "../assets/demo/soup.png";
import juiceImg from "../assets/demo/juice.png";
import milkshakeImg from "../assets/demo/milkshake.png";
import dessertImg from "../assets/demo/dessert.png";

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
    id: "paratha-sandwiches",
    name: "Paratha Sandwiches",
    heroImage: parathaImg,
    transitionStyle: "depth",
    products: [
      { id: "ps1", name: "Paratha 1", price: 10, image: parathaImg, description: "Demo description for Paratha 1", featured: true },
      { id: "ps2", name: "Paratha 2", price: 12, image: parathaImg, description: "Demo description for Paratha 2", featured: false },
      { id: "ps3", name: "Paratha 3", price: 15, image: parathaImg, description: "Demo description for Paratha 3", featured: false }
    ]
  },
  {
    id: "indomie-noodles",
    name: "Inomie Noodles",
    heroImage: indomieImg,
    transitionStyle: "steam",
    products: [
      { id: "in1", name: "Noodle 1", price: 15, image: indomieImg, description: "Demo description for Noodle 1", featured: true },
      { id: "in2", name: "Noodle 2", price: 18, image: indomieImg, description: "Demo description for Noodle 2", featured: false },
      { id: "in3", name: "Noodle 3", price: 20, image: indomieImg, description: "Demo description for Noodle 3", featured: false }
    ]
  },
  {
    id: "burger-special",
    name: "Burger Special",
    heroImage: burgerSpImg,
    transitionStyle: "depth",
    products: [
      { id: "bs1", name: "Burger 1", price: 25, image: burgerSpImg, description: "Demo description for Burger 1", featured: true },
      { id: "bs2", name: "Burger 2", price: 28, image: burgerSpImg, description: "Demo description for Burger 2", featured: false },
      { id: "bs3", name: "Burger 3", price: 30, image: burgerSpImg, description: "Demo description for Burger 3", featured: false }
    ]
  },
  {
    id: "combo-sandwich",
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
