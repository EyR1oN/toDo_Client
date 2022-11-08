import React from "react";
import "antd/dist/antd.css";
import "./styles/style.css";
import "antd/dist/antd.css";
import Header from "./Components/Header";
import MenuComponent from "./Components/MenuComponent";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MenuComponent />
    </>
  );
};

export default App;
