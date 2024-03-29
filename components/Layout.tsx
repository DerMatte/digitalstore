import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./Navbar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "DigitalStore" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />

    <div className="container mx-auto">{children}</div>
    {/* <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
    </footer> */}
  </div>
);

export default Layout;
