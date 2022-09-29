const SidebarLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full sm:w-[40vw]  h-screen  py-4 sm:border-r-[1px] border-borderGray">
      {props.children}
    </div>
  );
};

export default SidebarLayout;
