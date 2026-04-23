// Mock API layer — simula um JSON Server / backend REST
// Centraliza todo o "consumo" de dados da aplicação.

import parmigiano from "@/assets/cheese-parmigiano.jpg";
import brie from "@/assets/cheese-brie.jpg";
import gorgonzola from "@/assets/cheese-gorgonzola.jpg";
import mozzarella from "@/assets/cheese-mozzarella.jpg";
import manchego from "@/assets/cheese-manchego.jpg";
import canastra from "@/assets/cheese-canastra.jpg";
import chevre from "@/assets/cheese-chevre.jpg";
import gruyere from "@/assets/cheese-gruyere.jpg";

export type CheeseType =
  | "Duro"
  | "Macio"
  | "Azul"
  | "Fresco"
  | "Semi-curado"
  | "Curado";

export interface Cheese {
  id: string;
  name: string;
  origin: string;
  type: CheeseType;
  price: number;
  weight: string;
  image: string;
  description: string;
  pairing: string;
  lactoseFree: boolean;
  glutenFree: boolean;
  rating: number;
  stock: number;
}

const CHEESES: Cheese[] = [
  {
    id: "parmigiano-reggiano",
    name: "Parmigiano Reggiano 24 meses",
    origin: "Emília-Romanha, Itália",
    type: "Duro",
    price: 189.9,
    weight: "250 g",
    image: parmigiano,
    description:
      "O rei dos queijos italianos, envelhecido por 24 meses em caves tradicionais. Notas de frutas secas, caldo de carne e cristais salgados que estalam no paladar.",
    pairing: "Vinhos tintos encorpados, balsâmico envelhecido, peras frescas.",
    lactoseFree: true,
    glutenFree: true,
    rating: 4.9,
    stock: 12,
  },
  {
    id: "brie-de-meaux",
    name: "Brie de Meaux Artesanal",
    origin: "Île-de-France, França",
    type: "Macio",
    price: 89.5,
    weight: "200 g",
    image: brie,
    description:
      "Brie clássico de casca florida, miolo cremoso e sabor amanteigado com final de cogumelos frescos.",
    pairing: "Champagne, baguete crocante, geleia de figo.",
    lactoseFree: false,
    glutenFree: true,
    rating: 4.7,
    stock: 8,
  },
  {
    id: "gorgonzola-dolce",
    name: "Gorgonzola Dolce DOP",
    origin: "Lombardia, Itália",
    type: "Azul",
    price: 119.0,
    weight: "200 g",
    image: gorgonzola,
    description:
      "Versão jovem e suave do Gorgonzola, com veios azulados delicados e textura quase espalhável. Equilíbrio perfeito entre doçura e picância.",
    pairing: "Mel, nozes, vinhos doces de sobremesa.",
    lactoseFree: false,
    glutenFree: true,
    rating: 4.8,
    stock: 6,
  },
  {
    id: "mozzarella-bufala",
    name: "Mozzarella di Bufala Campana",
    origin: "Campânia, Itália",
    type: "Fresco",
    price: 64.9,
    weight: "250 g",
    image: mozzarella,
    description:
      "Mozzarella fresca de leite de búfala, textura elástica e centro úmido com sabor levemente ácido e refrescante.",
    pairing: "Tomate San Marzano, manjericão, azeite extravirgem.",
    lactoseFree: false,
    glutenFree: true,
    rating: 4.6,
    stock: 20,
  },
  {
    id: "manchego-12",
    name: "Manchego Curado 12 meses",
    origin: "La Mancha, Espanha",
    type: "Curado",
    price: 134.0,
    weight: "300 g",
    image: manchego,
    description:
      "Queijo de leite de ovelha com casca trançada característica. Sabor amendoado, untuoso e levemente picante.",
    pairing: "Marmelada, presunto ibérico, vinho tinto Rioja.",
    lactoseFree: true,
    glutenFree: true,
    rating: 4.8,
    stock: 10,
  },
  {
    id: "canastra-artesanal",
    name: "Canastra Artesanal",
    origin: "Serra da Canastra, Brasil",
    type: "Semi-curado",
    price: 72.0,
    weight: "350 g",
    image: canastra,
    description:
      "Patrimônio cultural brasileiro feito com leite cru. Massa firme, casca rústica e sabor frutado com toques de manteiga.",
    pairing: "Café preto, doce de leite, cachaça envelhecida.",
    lactoseFree: false,
    glutenFree: true,
    rating: 4.9,
    stock: 15,
  },
  {
    id: "chevre-frais",
    name: "Chèvre Frais ao Mel",
    origin: "Loire, França",
    type: "Fresco",
    price: 54.0,
    weight: "180 g",
    image: chevre,
    description:
      "Queijo de cabra fresco com textura aveludada e leve acidez. Servido com mel silvestre e tomilho.",
    pairing: "Pão integral, beterraba assada, vinho branco seco.",
    lactoseFree: true,
    glutenFree: true,
    rating: 4.5,
    stock: 18,
  },
  {
    id: "gruyere-aoc",
    name: "Gruyère AOP Suíço",
    origin: "Friburgo, Suíça",
    type: "Duro",
    price: 142.5,
    weight: "300 g",
    image: gruyere,
    description:
      "Queijo alpino de massa cozida prensada, com sabor complexo que evolui de doce a salgado conforme envelhece.",
    pairing: "Fondue, vinho branco seco, maçãs verdes.",
    lactoseFree: true,
    glutenFree: true,
    rating: 4.7,
    stock: 9,
  },
];

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async getCheeses(): Promise<Cheese[]> {
    await delay();
    return CHEESES;
  },
  async getCheeseById(id: string): Promise<Cheese | undefined> {
    await delay(150);
    return CHEESES.find((c) => c.id === id);
  },
  async login(email: string, password: string) {
    await delay(400);
    if (!email.includes("@") || password.length < 6) {
      throw new Error("Credenciais inválidas");
    }
    const token = btoa(`${email}:${Date.now()}`);
    return { token, user: { email, name: email.split("@")[0] } };
  },
  async register(name: string, email: string, password: string) {
    await delay(500);
    if (password.length < 6) throw new Error("Senha deve ter ao menos 6 caracteres");
    const token = btoa(`${email}:${Date.now()}`);
    return { token, user: { email, name } };
  },
};

export const CHEESE_TYPES: CheeseType[] = [
  "Duro",
  "Macio",
  "Azul",
  "Fresco",
  "Semi-curado",
  "Curado",
];
