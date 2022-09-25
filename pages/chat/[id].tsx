import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatRoom from "../../components/ChatRoom";
import Head from "next/head";

const ChatPage = () => {
  return (
    <>
      <Head>
        <title>Pomme&apos;s Demo Chat 🍎 </title>
      </Head>
      <div className="flex flex-row">
        <Sidebar />
        <ChatRoom />
      </div>
    </>
  );
};

export default ChatPage;
