import { User } from "@firebase/auth";
import {
  query,
  collection,
  orderBy,
  DocumentData,
  doc,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { isEmpty, update } from "lodash";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaUserCircle } from "react-icons/fa";
import { auth, db } from "../firebase.config";
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

  /* TODO: 클릭할 경우, 읽음처리하는 함수 */
  const updateReadStatus = async () => {
    const unreadQuery = query(
      collection(db, `chats/${chat.id}/messages`),
      where("isRead", "==", false)
    );
    let idArray: Array<string> = [];
    const querySnapshot = await getDocs(unreadQuery);
    if (querySnapshot.size !== 0) {
      querySnapshot.forEach((doc) => {
        idArray.push(doc.id);
      });
      for (let el of idArray) {
        const unreadRef = doc(db, `chats/${chat.id}/messages`, el);
        try {
          await updateDoc(unreadRef, { isRead: true });
        } catch (error) {
          console.error(error);
          return;
        }
      }
    } else {
      return;
    }
  };

  return (
    chat &&
    messages && (
      <div
        onClick={() => {
          updateReadStatus();
          router.replace(`/chat/${chat.id}`);
        }}
        key={Math.random()}
        className="flex flex-row items-center p-2 w-full cursor-pointer border-b border-borderGray"
      >
        <div className="flex w-4 sm:w-9">
          <FaUserCircle color="gray" size={36} width={64} height={64} />
        </div>
        <div className={"ml-1 sm:ml-3 flex flex-col w-full "}>
          {chat && (
            <span className="text-xs sm:text-lg line-clamp-2 break-all whitespace-normal overflow-hidden ">
              {getFriendEmail(chat?.users, user as User)}
            </span>
          )}
          <div className=" text-[1vw] sm:text-sm w-full  text-ellipsis overflow-hidden whitespace-nowrap ">
            {messages[0]?.text}
          </div>
        </div>
        {!isEmpty(messages) &&
          messages[0].sender !== user?.email &&
          messages[0].isRead === false && (
            <span className="flex shrink-0 items-center rounded-[50%] sm:w-4 sm:h-4 bg-primary"></span>
          )}
      </div>
    )
  );
};

export default memo(ChatListItem);
