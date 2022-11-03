import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Input, Typography, List } from "antd";
import VirtualList from "rc-virtual-list";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const ContainerHeight: number = 400;

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([
    "first column",
    "second column",
    "second column",
    "second column",
    "second column",
    "second column",
    "second column",
    "second column",
    "second column",
    "second column",
  ]);
  const [toDo, setToDo] = useState<string>("");

  return (
    <div className="App">
      <div>
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
          onClick={(e) => setData([...data, toDo])}
        >
          Add
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <List>
          <VirtualList
            style={{ display: "inline-block", width: "450px" }}
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="item"
            //onScroll={onScroll}
          >
            {(item: string) => (
              <List.Item key={item.length}>
                <PlusOutlined onClick={(): void => console.log("sdssds")} />
                <div>{item}</div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
    </div>
  );
};

export default App;
