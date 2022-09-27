import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase.config";
import { TopBar, InputBar } from "../../components/ChattingBar";
import getFriendEmail from "../../lib/getFriendEmail";
import { User } from "firebase/auth";
import { LinkItUrl } from "react-linkify-it";

const ChatPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [user] = useAuthState(auth);
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));

  const [chat] = useDocumentData(doc(db, "chats", id));
  const [messages] = useCollectionData(q);

  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const getMessages = () =>
    messages?.map((msg) => {
      // 보낸 사람이 본인
      const isSenderMe = msg.sender === user?.email;
      return (
        <li
          key={Math.random()}
          className={!isSenderMe ? "flex justify-start" : "flex justify-end"}
        >
          <div
            className={
              !isSenderMe
                ? "relative max-w-xl px-4 py-2 text-gray-700 bg-white rounded shadow"
                : "relative max-w-xl px-4 py-2 text-gray-700 bg-primary text-white rounded shadow"
            }
          >
            <LinkItUrl>
              <span className="block">{msg.text}</span>
            </LinkItUrl>
          </div>
        </li>
      );
    });

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>Pomme&apos;s Demo Chat 🍎 </title>
      </Head>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-secondaryWhite h-screen w-full">
          {chat && (
            <TopBar userEmail={getFriendEmail(chat?.users, user as User)} />
          )}
          <div className="flex overflow-x-scroll scrollbar-hide flex-1 flex-col p-3 h-max">
            <ul className="space-y-2 flex overflow-x-scroll scrollbar-hide flex-1 flex-col p-3 h-max">
              {/* 상대가 보낸 채팅일 경우 */}
              {getMessages()}
              <div ref={bottomOfChatRef}></div>
            </ul>
            <InputBar id={id} user={user as User} />
            {/* InputBar */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
