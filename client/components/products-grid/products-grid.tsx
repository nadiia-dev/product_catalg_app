import ProductCard from "../product-card/product-card";
import { Product } from "@/types";
import "./products-grid.scss";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <ul className="product-list">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductsGrid;
