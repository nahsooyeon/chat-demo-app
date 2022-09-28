import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomme&apos;s Demo Chat 🍎 </title>
        <meta property="og:title" content={`Pomme's Demo Chat🍎`} key="title" />
        <meta
          property="og:description"
          content={"Enjoy chatting with your friend!"}
          key="description"
        />
        <link rel="icon"></link>
      </Head>
      <Sidebar />
    </>
  );
};

export default Home;
