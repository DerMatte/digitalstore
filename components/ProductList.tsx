import { Product } from ".prisma/client";
import Link from "next/link";
import ProductItem from "./ProductItem";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <ProductItem p={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
