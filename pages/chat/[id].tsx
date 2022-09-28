import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  DocumentData,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase.config";
import { TopBar, InputBar } from "../../components/ChattingBar";
import getFriendEmail from "../../lib/getFriendEmail";
import { signOut, User } from "firebase/auth";
import { LinkItUrl } from "react-linkify-it";
import getFormatedDate from "../../lib/getFormatedDate";

const ChatPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [user] = useAuthState(auth);
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));

  const [chat] = useDocumentData(doc(db, "chats", id));
  const [messages] = useCollectionData(q);

  const bottomOfChatRef = useRef<HTMLDivElement>(null);
  const [loadComplete, setLoadComplete] = useState<boolean>(false);

  const getMessages = () =>
    messages?.map((msg: DocumentData) => {
      // 보낸 사람이 본인
      const isSenderMe = msg.sender === user?.email;

      return (
        <li
          key={Math.random()}
          className={!isSenderMe ? "flex justify-start " : "flex justify-end "}
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
          <div className="ml-1 mb-auto text-xs ">
            test
            {/*   {getFormatedDate(msg.timestamp)} */}
          </div>
        </li>
      );
    });

  useEffect(() => {
    if (user && chat && chat.users.includes(user.email) === false) {
      signOut(auth);
      router.replace("/");
    } else {
      setLoadComplete(true);
    }
  }, [chat, router, user]);

  useEffect(() => {
    /* TODO: Firestore 보안 규칙 설정 필요 */
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
        <div className="sm:block hidden">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col bg-secondaryWhite h-screen w-full">
          {chat && (
            <TopBar userEmail={getFriendEmail(chat?.users, user as User)} />
          )}
          {loadComplete ? (
            <div className="flex overflow-x-scroll scrollbar-hide flex-1 flex-col p-3 h-max">
              <ul className="space-y-2 flex overflow-x-scroll scrollbar-hide flex-1 flex-col p-3 h-max">
                {/* 상대가 보낸 채팅일 경우 */}
                {getMessages()}
                <div ref={bottomOfChatRef}></div>
              </ul>
              <InputBar id={id} user={user as User} />
              {/* InputBar */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
