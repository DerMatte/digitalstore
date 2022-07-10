import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { prisma } from "lib/prisma";
import { GetStaticProps, GetStaticPaths } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

interface Props {
  product: Product;
}

const ProductPage = ({ product }: Props) => {
  return (
    <Layout>
      <div className=" m-2 flex max-w-6xl flex-col px-8">
        <h1 className="pt-8 text-3xl">{product.name}</h1>
        <div className="py-8">
          <Link href="/product">
            <a>{`<-- Back`}</a>
          </Link>
        </div>
        <div id="heroimg" className="my-6">
          <Image
            src={product.image}
            alt={product.name}
            width={1080}
            height={720}
          />
        </div>
        <p className="text my-6 py-4">
          <ReactMarkdown>{product.description}</ReactMarkdown>
        </p>
        <p className="text-right">
          Price:{" "}
          <span className="underline decoration-sky-500 decoration-2 hover:decoration-dotted ">
            {product.price} EUR
          </span>
        </p>
      </div>
    </Layout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const product: Product = await prisma.product.findUnique({
    where: {
      slug: params.slug as string,
    },
  });
  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const products: Product[] = await prisma.product.findMany();

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ProductPage;
