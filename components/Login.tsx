import React, { useCallback, useRef } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { IoMdChatboxes } from "react-icons/io";

const LoginForm = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <div className="w-max  flex flex-col items-center justify-center py-8 px-4 rounded-xl bg-gradient-to-r from-[#8ad3a4] via-[#45b18f] via-3/5 to-[#45b18f]">
        <div className=" font-sans text-white text-3xl">
          Pomme&apos;s Chat App 🍎
        </div>

        <IoMdChatboxes size={100} color="white" />
        <button
          onClick={() => signInWithGoogle([""], { prompt: "select_account" })}
          className="min-w-[250px] h-8 rounded max-w-[30vw]  bg-secondaryWhite text-secondary"
        >
          로그인 하기
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
