import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import LoginForm from "../components/Login";
import CommonHead from "../components/Head";
import LoadingSpinner from "../components/LoadingSpinner";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <CommonHead />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
