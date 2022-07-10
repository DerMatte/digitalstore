import { Product } from ".prisma/client";
import Link from "next/link";
import ProductItem from "./ProductItem";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <>
      <ul className="grid grid-rows-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem p={product} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
