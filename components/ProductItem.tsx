import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

type Props = {
  p: Product;
};

const ProductItem = ({ p }: Props) => {
  return (
    <Link href={`product/${encodeURIComponent(p.slug)}`}>
      <a className="m-6 flex flex-col">
        <div className=" max-w-lg ">
          <Image
            src={p.image}
            alt={`Product ${p.name}`}
            width={1280}
            height={720}
          />
        </div>
        <h1 className="my-4 text-2xl">{p.name}</h1>
        <p className="my-2">
          <ReactMarkdown>{p.description}</ReactMarkdown>
        </p>
        <p className=" my-2">{p.price} XRP</p>
      </a>
    </Link>
  );
};

export default ProductItem;
