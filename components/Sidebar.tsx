import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { signOut, User } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
import { RiLogoutBoxRLine } from "react-icons/ri";
// import ChatListItem from "./ChatListItem";
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

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));

  const isChatExists = (email: string) =>
    chats?.find(
      (chat) =>
        chat.users.includes(user?.email as string) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("대화를 시작할 친구의 이메일 주소를 입력해주세요.");
    if (
      !isChatExists(input as string) &&
      input !== user?.email &&
      (input as string).length > 0
    ) {
      await addDoc(collection(db, "chats"), { users: [user?.email, input] });
    }
  };
  const chats = snapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as IChat)
  ) as Array<IChat>;

  const ChatList = () => {
    return chats
      .filter((chat) => chat.users?.includes((user as User).email as string))
      .map((chat, idx) => {
        return <ChatListItem key={Math.random()} chat={chat} />;
      });
  };

  return (
    <div className="flex flex-col  h-screen w-[40vw] p-4 border-r-[1px] border-borderGray">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center">
          <Image
            className="rounded-full"
            src={user?.photoURL as string}
            width={49}
            height={49}
            alt="profileImage"
          />
          <span className="block ml-4 text-lg">{user?.displayName}</span>
        </div>
        <RiLogoutBoxRLine
          onClick={() => signOut(auth)}
          className="rounded-full bg-secondaryWhite"
          size={25}
        />
      </div>
      <div
        onClick={() => {
          newChat();
        }}
        className="my-3 p-2 font-medium rounded bg-tertiary text-center w-full cursor-pointer"
      >
        New Chat
      </div>
      {/* ChatListItem */}
      <div className="flex flex-col overflow-y-scroll scrollbar-hide">
        {chats && ChatList()}
        {/* <ChatListItem /> */}
      </div>
    </div>
  );
};

export default memo(Sidebar);
