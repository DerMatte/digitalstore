// import Link from "next/link";
import { Product } from "@prisma/client";
import { prisma } from "lib/prisma";
import ProductList from "../../components/ProductList";
import { GetStaticProps } from "next";
import Layout from "../../components/Layout";

export const getStaticProps: GetStaticProps = async () => {
  const products: Product[] = await prisma.product.findMany();
  return {
    props: { products },
  };
};

const ProductIndex = ({ products }) => {
  return (
    <Layout>
      <div className="m-16 flex flex-col">
        <h1 className="mb-8 text-3xl">Products</h1>
        <ProductList products={products} />
      </div>
    </Layout>
  );
};

export default ProductIndex;
