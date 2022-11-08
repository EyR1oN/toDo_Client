import React, { useState } from "react";
import "antd/dist/antd.css";
import "../styles/style.css";
import { Breadcrumb, Layout } from "antd";
import CategoryModel from "../models/CategoryModel";
import ToDoList from "./ToDoList";
import CategoryList from "./CategoryList";

const { Header, Content, Sider } = Layout;

const MenuComponent: React.FC = () => {
  const [chosenCategory, setChosenCategory]: [
    CategoryModel,
    React.Dispatch<React.SetStateAction<CategoryModel>>
  ] = useState<CategoryModel>({ id: undefined, name: undefined });

  return (
    <Layout>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <CategoryList chosenCategory={setChosenCategory} />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Category</Breadcrumb.Item>
            <Breadcrumb.Item>{chosenCategory.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 500,
            }}
          >
            <ToDoList category={chosenCategory}></ToDoList>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MenuComponent;
