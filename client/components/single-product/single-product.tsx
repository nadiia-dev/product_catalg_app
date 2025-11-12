"use client";

import {
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
} from "@/store/slices/products";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProductsGrid from "../products-grid/products-grid";
import "./single-product.scss";
import StatusBadge from "../status-badge/status-badge";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

const SingleProduct = () => {
  const params = useParams<{ slug: string }>();

  const { data: product, isLoading } = useGetProductBySlugQuery(params.slug);

  const { data: related } = useGetRelatedProductsQuery(
    { slug: params.slug, category: product?.category || "" },
    { skip: !product }
  );

  if (isLoading) return <Spinner />;
  if (!product) return <Error text="Error loading product" />;

  return (
    <div className="product-page">
      <h1>{product.title}</h1>
      <div>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
        />
        <div>
          <div>
            <p>${product.price}</p>
            <StatusBadge status={product.availability} />
          </div>
          <p>Description</p>
          <p>{product.description}</p>
        </div>
      </div>

      <h2>Related Products</h2>
      {related && related.length > 0 ? (
        <ProductsGrid products={related} />
      ) : (
        <div>No related products in this category</div>
      )}
    </div>
  );
};

export default SingleProduct;
