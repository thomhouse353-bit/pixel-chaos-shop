export type Rarity = 'brainrot' | 'secreto';

export interface Product {
  id: string;
  name: string;
  price: number;
  rarity: Rarity;
  image: string;
  gameValue?: string; // Valor no jogo (ex: "70M", "2B", "1.5T")
}

export interface CartItem extends Product {
  quantity: number;
}