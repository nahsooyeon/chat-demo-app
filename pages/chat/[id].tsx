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
import { getFormattedDate, getPassedDate } from "../../lib/getFormattedDate";
import { isEmpty, isNull } from "lodash";

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
    messages?.map((msg: DocumentData, idx: number) => {
      // 메세지 발송하는 시간과 이전 날짜가 다르면 렌더링하지않음.
      /* 같은 경우를 default 로 놓고 */

      const isSenderMe = msg.sender === user?.email;
      const startDate = getPassedDate(
        msg.timestamp,
        messages[idx - 1]?.timestamp
      );

      return (
        <>
          {!isEmpty(startDate) && (
            <div className="w-full text-xs text-center flex flex-row items-center justify-center pt-2 pb-1">
              <div className=" flex-1  h-[1px] bg-borderGray"></div>
              <span className="text-lightGray px-2">{startDate}</span>
              <div className=" flex-1  h-[1px] bg-borderGray"></div>
            </div>
          )}

          <li
            key={Math.random()}
            className={
              !isSenderMe ? "flex justify-start " : "flex justify-end "
            }
          >
            <div
              className={
                !isSenderMe
                  ? "relative max-w-xl px-4 py-2 text-gray-700 bg-white rounded shadow"
                  : "relative max-w-xl px-4 py-2 text-gray-700 bg-primary text-white rounded shadow"
              }
            >
              <LinkItUrl>
                <span className="block break-all whitespace-normal">
                  {msg.text}
                </span>
              </LinkItUrl>
            </div>
            <div className=" text-xs flex justify-end items-end ml-2 text-gray ">
              <span>{getFormattedDate(msg.timestamp)}</span>
            </div>
          </li>
        </>
      );
    });

  useEffect(() => {
    if (user && chat && chat.users.includes(user.email) === false) {
      /* TODO: Firestore 보안 규칙 설정 필요 */

      signOut(auth);
      router.replace("/");
    } else {
      setLoadComplete(true);
    }
  }, [chat, router, user]);

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
        <div className="sm:block hidden">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col bg-secondaryWhite h-screen w-full">
          {chat && (
            <TopBar userEmail={getFriendEmail(chat?.users, user as User)} />
          )}
          {loadComplete ? (
            <div className="flex overflow-x-scroll scrollbar-hide flex-1 flex-col p-2  h-max">
              <ul className="space-y-2 flex overflow-x-scroll scrollbar-hide flex-1 flex-col p-1 h-max">
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
