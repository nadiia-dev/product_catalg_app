"use client";

import Image from "next/image";
import { Product } from "@/types";
import "./product-card.scss";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <li className="product-card">
      <a href={`/products/${product.slug}`} className="product-card__link">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={160}
          className="product-card__image"
        />
        <h2 className="product-card__title">{product.title}</h2>
        <p className="product-card__price">${product.price}</p>
      </a>
    </li>
  );
};

export default ProductCard;
