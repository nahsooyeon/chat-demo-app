import React, { useState, useRef, useEffect, useCallback } from "react";
import { signOut, User } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { collection, addDoc } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export interface IChat {
  id: string;
  users: Array<string>;
}

import { useRouter } from "next/router";
import ChatListItem from "./ChatListItem";
import { isEmail } from "class-validator";
import { isNull } from "lodash";
import { checkSpaceBug } from "../lib/checkSpace";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Array<IChat>;

  const isChatExists = (email: string) =>
    chats?.find(
      (chat) =>
        chat.users?.includes(user?.email as string) &&
        chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("대화를 시작할 친구의 이메일 주소를 입력해주세요.");
    if (!checkSpaceBug(input as string) || isNull(input)) {
      return;
    } else if (
      !isChatExists(input as string) &&
      input !== user?.email &&
      isEmail(input)
    ) {
      await addDoc(collection(db, "chats"), { users: [user?.email, input] });
    } else {
      alert("사용자 정보가 올바르지 않습니다!");
      return;
    }
  };

  const logout = () => {
    signOut(auth);
    router.replace("/");
  };

  const ChatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes((user as User)?.email as string))
      .map((chat) => <ChatListItem key={Math.random()} chat={chat} />);
  };

  return (
    <div className="flex flex-col w-full sm:w-[40vw]  h-screen  py-4 border-r-[1px] border-borderGray">
      <div className="flex flex-row justify-between w-full items-center px-2">
        <div className="flex flex-row items-center ">
          <Image
            className="rounded-full "
            src={user?.photoURL as string}
            width={49}
            height={49}
            alt="profileImage"
          />
          <span className="block font-semibold ml-2 sm:ml-4  text-base  sm:text-lg">
            {user?.displayName}
          </span>
        </div>
        <RiLogoutBoxRLine
          onClick={logout}
          className="rounded-full bg-secondaryWhite"
          size={25}
        />
      </div>
      <div className="my-3 p-2  w-full cursor-pointer">
        <button
          onClick={(e) => {
            e.preventDefault();
            newChat();
          }}
          className="font-medium rounded bg-tertiary p-2 text-center w-full "
        >
          New Chat
        </button>
      </div>

      <div className="flex flex-col overflow-y-scroll scrollbar-hide">
        {ChatList()}
      </div>
    </div>
  );
};

export default Sidebar;
