import React from "react";
import "antd/dist/antd.css";
import { Button, Input, Typography, List, Divider } from "antd";
import VirtualList from "rc-virtual-list";
import { useState, useEffect } from "react";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles/style.css";
import { getToDoList, postToDo, deleteToDo } from "./api/toDoApi";
import ToDoModel from "./models/ToDoModel";

const { Title } = Typography;

const App: React.FC = () => {
  const [data, setData]: [
    ToDoModel[],
    React.Dispatch<React.SetStateAction<ToDoModel[]>>
  ] = useState<ToDoModel[]>([]);
  useEffect((): void => {
    getToDoList(setData);
  }, []);
  const [toDo, setToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  return (
    <div className="center-items">
      <div className="center-cont">
        <div className="header">
          <div className="top-25-pr">
            <Title level={2}>ToDo List</Title>
            <Input
              size="middle"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToDo(e.target.value)
              }
              style={{ width: "400px" }}
              placeholder="add ToDo"
            />
            <Button
              type="primary"
              size="middle"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                console.log(toDo);
                postToDo({ name: toDo, isDone: false });
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="center-cont">
        <div className="main-cont">
          <List>
            <Divider orientation="left">All Categories</Divider>
            <VirtualList
              className="viral-list"
              data={data}
              height={400}
              itemHeight={47}
              itemKey="id"
            >
              {(item: ToDoModel) => (
                <List.Item key={item.id}>
                  {item.isDone ? (
                    <CheckOutlined
                      style={{ color: "green" }}
                      onClick={(): void => {
                        item.isDone = !item.isDone;
                      }}
                    />
                  ) : (
                    <PlusOutlined
                      style={{ color: "blue" }}
                      onClick={(): void => {
                        item.isDone = !item.isDone;
                      }}
                    />
                  )}
                  <div>
                    {item.name}{" "}
                    <CloseOutlined
                      style={{ color: "red" }}
                      onClick={(): void => {
                        deleteToDo(item.id);
                      }}
                    />
                  </div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>
      </div>
    </div>
  );
};

export default App;
