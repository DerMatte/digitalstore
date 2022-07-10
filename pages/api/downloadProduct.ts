// This is an example of to protect an API route
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

import { SupabaseStorageClient } from "@supabase/storage-js";
import { METHODS } from "http";

const storageClient = new SupabaseStorageClient(process.env.STORAGE_URL, {
  apikey: process.env.SERVICE_KEY,
  Authorization: `Bearer ${process.env.SERVICE_KEY}`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method != "POST") {
    res.status(405).end();
    return;
  }
  if (session) {
    const { slug } = req.body;
    console.log(slug);

    // session.user.userId
    // get bought products of current user
    const userProducts = await prisma.user.findUniqueOrThrow({
      where: { id: session?.userId },
      select: {
        products: true,
      },
    });

    // validate that user owns the product & create signed link
    if (
      userProducts.products &&
      userProducts?.products?.some((product) => product.slug === slug)
    ) {
      const { data, error } = await storageClient
        .from("products")
        .createSignedUrl(`${slug}.zip`, 60);

      return res.status(200).send({
        content: "Success! Your download link is ready",
        url: data.signedURL,
        userProducts,
      });
    }

    return res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
      // url: data.signedURL,
      userProducts,
    });
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
