export type ProductType = {
  title: string;
  description: string;
  image: Buffer;
  category: string;
  price: number;
  availability: boolean;
};

export type ProductReturnType = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  availability: boolean;
  slug: string;
};
