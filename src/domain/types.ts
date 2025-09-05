export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  slug: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
};

export type User = {
  username: string;
  userId: string;
};

export type AuthResult = {
  user: {
    id: string;
    username: string;
  };
};

export type CartItem = Product & {
  quantity: number;
};
