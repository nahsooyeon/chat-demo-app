import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseConfig";
import LoginForm from "../components/Login";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <>Loading...</>;
  }

  if (!user) {
    return <LoginForm />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
