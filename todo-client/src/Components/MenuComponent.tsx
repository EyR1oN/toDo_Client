import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../styles/style.css";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, List, MenuProps, Space } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import CategoryModel from "../models/CategoryModel";
import { getCategories } from "../api/categoryApi";
import VirtualList from "rc-virtual-list";
import ToDoList from "./ToDoList";
import { postToDo } from "../api/toDoApi";

const { Header, Content, Sider } = Layout;

const MenuComponent: React.FC = () => {
  const [categories, setCategories]: [
    CategoryModel[],
    React.Dispatch<React.SetStateAction<CategoryModel[]>>
  ] = useState<CategoryModel[]>([]);

  const [chosenCategory, setChosenCategory]: [
    CategoryModel,
    React.Dispatch<React.SetStateAction<CategoryModel>>
  ] = useState<CategoryModel>({ id: undefined, name: undefined });

  useEffect((): void => {
    getCategories(setCategories);
  }, []);

  return (
    <Layout>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <List>
            <VirtualList
              className="viral-list"
              data={categories}
              //height={400}
              itemHeight={47}
              itemKey="id"
            >
              {(item: CategoryModel) => {
                return (
                  <List.Item
                    key={item.id}
                    onClick={() => setChosenCategory(item)}
                    className={"center-items"}
                  >
                    <div className="float-left">{item.name}</div>
                    <div className="float-right">
                      <EditOutlined />
                      <DeleteOutlined />
                    </div>
                  </List.Item>
                );
              }}
            </VirtualList>
          </List>
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
              minHeight: 280,
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
