import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomme&apos;s Demo Chat 🍎 </title>
        <meta name="description" content="Developed by create-next-app"></meta>
        <link rel="icon"></link>
      </Head>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-secondaryWhite h-screen w-full"></div>
      </div>
    </>
  );
};

export default Home;
