import Head from "next/head";
import { memo } from "react";

const CommonHead = () => {
  return (
    <Head>
      <title>Pomme&apos;s Chat App 🍎 </title>
      <meta name="og:site_name" content={`Pomme's Demo Chat🍎`} key="title" />
      <meta name="og:title" content={`Pomme's Chat App🍎`} key="title" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} key="url" />
      <meta
        property="og:description"
        content={"Enjoy chatting with your friend!"}
        key="description"
      />
      <meta name="description" content="Enjoy chatting with your friend!" />
      <link rel="icon"></link>
    </Head>
  );
};

export default memo(CommonHead);
