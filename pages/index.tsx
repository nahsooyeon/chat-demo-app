import type { NextPage } from "next";
import CommonHead from "../components/Head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <CommonHead />
      <Sidebar />
    </>
  );
};

export default Home;
