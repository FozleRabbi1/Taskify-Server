export type TProduct = {
    name: string;
    recipe: string;
    image: string;
    category: 'salad' | 'drinks' | 'popular' | 'dessert' | 'pizza' | 'soup' | 'offered';
    price: number;
  }
  