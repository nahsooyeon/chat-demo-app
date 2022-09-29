import Sidebar from "../components/Sidebar";

const ChatLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <div className="sm:block hidden">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col bg-secondaryWhite h-screen w-full">
        {props.children}
      </div>
    </div>
  );
};

export default ChatLayout;
