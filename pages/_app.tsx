import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import LoginForm from "../components/Login";
import FadeLoader from "react-spinners/FadeLoader";

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

  return <Component {...pageProps} />;
}

export default MyApp;
