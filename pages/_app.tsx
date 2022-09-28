import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import LoginForm from "../components/Login";
import Head from "next/head";
import LoadingSpinner from "../components/LoadingSpinner";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-screen flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <Head>
        <title>Pomme&apos;s Chat App 🍎 </title>
        <meta property="og:title" content={`Pomme's Chat App🍎`} key="title" />
        <meta
          property="og:description"
          content={"Enjoy chatting with your friend!"}
          key="description"
        />
        <meta name="description" content="Enjoy chatting with your friend!" />
        <link rel="icon"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
