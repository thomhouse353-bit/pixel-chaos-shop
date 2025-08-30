export type Rarity = 'brainrot' | 'secreto';

export interface Product {
  id: string;
  name: string;
  price: number;
  rarity: Rarity;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}