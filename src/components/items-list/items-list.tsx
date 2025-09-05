"use client";

import { Product, CartItem } from "@/domain";
import { FavoriteButton, CartButton } from "..";
import Link from "next/link";
import Image from "next/image";

interface ItemsListProps {
  title: string;
  products: (Product | CartItem)[];
  emptyMessage: string;
}

function ItemsList({ title, products, emptyMessage }: ItemsListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div className="flex-grow mr-4">
              <Link
                href={`/products/${item.slug}`}
                className="font-semibold text-lg hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-gray-600">
                {item.price.toFixed(2)} هزار تومان
              </p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <CartButton product={item} />
              <FavoriteButton product={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ItemsList };
