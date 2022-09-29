import { memo } from "react";

type TProps = {
  handler: () => void;
};

const NewChatButton = ({ handler }: TProps) => {
  return (
    <div className="my-3 p-2  w-full cursor-pointer">
      <button
        onClick={(e) => {
          e.preventDefault();
          handler();
        }}
        className="font-medium rounded bg-tertiary p-2 text-center w-full "
      >
        New Chat
      </button>
    </div>
  );
};

export default memo(NewChatButton);
