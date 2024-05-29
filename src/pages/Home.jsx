import React from "react";
import Sidebar from "./../components/sidebar/Sidebar";
import Columns from "./../components/sidebar/Columns";
import Main from "./../components/main/Main";

const Home = () => {
  return (
    <div style={{width: "100vw", height: "100vh",display: "flex", flexDirection: "row"}}>
      <Sidebar />
      <Main />
      <Columns />
    </div>
  );
};

export default Home;
