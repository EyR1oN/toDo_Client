import React from "react";
import "antd/dist/antd.css";
import { Button, Input, Typography, List } from "antd";
import VirtualList from "rc-virtual-list";
import { useState } from "react";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles/style.css";

const { Title } = Typography;

type ToDoData = {
  id: number;
  describe: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<ToDoData[]>([
    {id: 1, describe: "first column"},
    {id: 2, describe: "second column"},
    {id: 3, describe: "third column"},
    {id: 4, describe: "fourth column"},
    {id: 5, describe: "fifth column"},
    {id: 6, describe: "sixth column"},
    {id: 7, describe: "seventh column"},
  ]);
  const [toDo, setToDo] = useState<string>("");

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
              onClick={(e) => setData([...data, {id: data.length + 1, describe: toDo}])}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="center-cont">
        <div className="main-cont">
          <List>
            <VirtualList
              className="viral-list"
              data={data}
              height={400}
              itemHeight={47}
              itemKey="item"
            >
              {(item: ToDoData) => (
                <List.Item key={item.id}>
                  <PlusOutlined onClick={(): void => console.log(item)} />
                  <div>{item.describe}</div>
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
