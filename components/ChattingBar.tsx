import { auth } from "firebase-admin";
import { User } from "firebase/auth";
import {
  WithFieldValue,
  DocumentData,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { FC, memo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCircle } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { db } from "../firebase.config";

type TTopBarProps = {
  userEmail: string;
};

type TInputBarProps = {
  id: string;
  user: User;
};

export const TopBar: FC<TTopBarProps> = memo((props) => {
  return (
    <div className="flex flex-row items-center p-4 w-full bg-tertiary">
      <FaUserCircle size={36} />
      <div className="font-semibold text-lg ml-2">{props.userEmail}</div>
    </div>
  );
});

TopBar.displayName = "TopBar";

export const InputBar: FC<TInputBarProps> = memo((props) => {
  const { id, user } = props;
  const [inputMsg, setInputMsg] = useState<string>("");

  const submitMessage = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!isEmpty(inputMsg)) {
      try {
        let newMessage: WithFieldValue<DocumentData> = {};
        newMessage.isRead = false;
        newMessage.text = inputMsg;
        newMessage.sender = user?.email as string;
        newMessage.timestamp = serverTimestamp();

        await addDoc(collection(db, `/chats/${id}/messages`), newMessage);
      } catch (error) {
        alert(
          "메세지 전송 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
        );
      } finally {
        setInputMsg("");
      }
    }
  };

  return (
    <div className="mb-0 w-full relative mt-auto flex flex-row items-center ">
      <input
        type="text"
        disabled={!user}
        value={inputMsg}
        onChange={(e) => {
          setInputMsg(e.target.value);
        }}
        placeholder={user ? "Type a message..." : "Loading..."}
        className="w-full h-12 rounded shadow border-borderGray border px-2"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            submitMessage(e);
          }
        }}
      />
      <button
        onClick={(e) => {
          submitMessage(e);
        }}
        className="bg-primary ml-3 rounded p-3 text-white"
      >
        <GrSend size={25} color="white" />
      </button>
    </div>
  );
});

InputBar.displayName = "InputBar";
