import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
