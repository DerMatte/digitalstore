import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/Layout";
import { prisma } from "../lib/prisma";
import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import ProductList from "components/ProductList";
import { Product } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ServerSidePage({
  session,
  userProducts,
}: {
  session: Session;
  userProducts: Product[];
}) {
  const download = async (slug: string) => {
    console.log("downloading", slug);

    const myProducts = await fetch("/api/downloadProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        slug,
      }),
    });
    const response = await myProducts.json();
    // console.log(response);

    const { url } = response;
    window.open(url);
    return url;
  };

  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  return (
    <Layout>
      <h1 className="pt-12 text-2xl">Download Page | Bought Products</h1>
      <p>here you can download the products you already bought</p>

      {userProducts.products.length === 0 && (
        <div className="pt-8">
          <span className="text-md">
            No products bought yet. All bought products will be listed here.{" "}
          </span>
          <Link href="/product">
            <a className="text-md pt-8 text-blue-500 hover:text-blue-700">
              You can buy here.
            </a>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 items-center justify-center gap-y-8 pt-8">
        {userProducts.products.map((product) => (
          <div key={product.id} className="max-w-md border-2">
            <h2 className="pb-4 pt-2 text-xl">{product.name}</h2>
            <img src={product.image} alt={product.name} className="max-w-sm" />
            <ReactMarkdown className="mt-4 line-clamp-2">
              {product.description}
            </ReactMarkdown>
            {/* <p>{product.slug}</p> */}
            <button
              onClick={() => download(product.slug)}
              className="my-8 rounded-lg bg-slate-600 px-6 py-3 hover:bg-slate-800 hover:text-white"
            >
              Download
            </button>
          </div>
        ))}
      </div>

      {/* <ProductList products={userProducts.products} /> */}
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      {/* <iframe src="/api/downloadProduct" /> */}
    </Layout>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userProducts = await prisma.user.findUnique({
    where: { id: session?.userId },
    select: { products: true },
  });

  // console.log(userProducts);

  return {
    props: {
      session,
      userProducts,
    },
  };
}
