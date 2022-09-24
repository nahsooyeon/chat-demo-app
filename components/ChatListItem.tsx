import { User } from "@firebase/auth";
import { query, collection, orderBy, DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaUserCircle } from "react-icons/fa";
import { auth, db } from "../lib/firebaseConfig";
import getFriendEmail from "../lib/getFriendEmail";
import { IChat } from "./Sidebar";

type TProps = {
  chat: IChat;
};

const ChatListItem: FC<TProps> = (props) => {
  const router = useRouter();
  const { chat } = props;
  const [user] = useAuthState(auth);
  const q = query(
    collection(db, `chats/${chat.id}/messages`),
    orderBy("timestamp", "desc")
  );

  const [messages] = useCollectionData(q) as DocumentData[];
  return (
    chat &&
    messages && (
      <div
        onClick={() => {
          router.replace(`/chat/${chat.id}`);
        }}
        key={Math.random()}
        className="flex flex-row items-center p-2 w-full cursor-pointer"
      >
        <FaUserCircle color="gray" size={36} />
        <div className="ml-3 flex flex-col">
          {chat && <span>{getFriendEmail(chat?.users, user as User)}</span>}
          <span className="text-sm">{messages[0]?.text}</span>
        </div>
      </div>
    )
  );
};

export default memo(ChatListItem);
