import React, { memo, useState } from "react";
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

interface IChatListProps {
  inputValue: string;
}

import { useRouter } from "next/router";
import ChatListItem from "./ChatListItem";
import { isNull } from "lodash";
import { checkSpaceBug } from "../lib/checkSpace";
import isEmail from "../lib/isEmail";
import getFriendEmail from "../lib/getFriendEmail";
import NewChatButton from "./NewChatButton";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import SidebarLayout from "../layouts/SidebarLayout";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Array<IChat>;
  const [inputSearch, setInputSearch] = useState<string>("");

  const isChatExists = (email: string) =>
    chats?.find(
      (chat) =>
        chat.users?.includes(user?.email as string) &&
        chat.users.includes(email)
    );

  const createNewChat = async () => {
    const input = prompt("대화를 시작할 친구의 이메일 주소를 입력해주세요.");
    if (isNull(input)) {
      return;
    } else if (!checkSpaceBug(input)) {
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

  const getChatList = (keyword?: string) => {
    if (keyword) {
      return chats
        ?.filter((chat) => chat.users.includes((user as User)?.email as string))
        .filter((el) =>
          getFriendEmail(el.users, user as User).includes(keyword as string)
        )
        .map((chat) => <ChatListItem key={Math.random()} chat={chat} />);
    } else {
      return chats
        ?.filter((chat) => chat.users.includes((user as User)?.email as string))
        .map((chat) => <ChatListItem key={Math.random()} chat={chat} />);
    }
  };

  const handleSearchInput = (value: string) => {
    setInputSearch(value);
  };

  const ChatList = memo(({ inputValue }: IChatListProps) => {
    return (
      <div className="flex h-max flex-col overflow-y-scroll scrollbar-hide">
        {getChatList(inputValue)}
      </div>
    );
  });

  ChatList.displayName = "ChatList";

  return (
    <SidebarLayout>
      {user && <UserMenu logout={logout} user={user as User} />}
      <NewChatButton handler={createNewChat} />
      <SearchBar value={inputSearch} handler={handleSearchInput} />
      <ChatList inputValue={inputSearch} />
    </SidebarLayout>
  );
};

export default Sidebar;
