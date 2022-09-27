import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import LoginForm from "../components/Login";
import FadeLoader from "react-spinners/FadeLoader";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-screen flex items-center justify-center h-screen">
        <FadeLoader color="#36d7b7" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <Head>
        <title>Pomme&apos;s Demo Chat 🍎 </title>
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_URL}
          key="url"
        />
        <meta property="og:title" content={`Pomme's Demo Chat🍎`} key="title" />
        <meta
          property="og:description"
          content={"Enjoy chatting with your friend!"}
          key="description"
        />
        <link rel="icon"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
