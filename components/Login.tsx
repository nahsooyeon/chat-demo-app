import React, { useCallback, useRef } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const LoginForm = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <button
        onClick={() => signInWithGoogle([""], { prompt: "select_account" })}
        className="min-w-[250px] h-20 rounded max-w-[30vw]  bg-primary text-white"
      >
        SING WITH GOOGLE
      </button>
    </div>
  );
};

export default LoginForm;
