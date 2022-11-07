import React from "react";
import "antd/dist/antd.css";
import { Button, Input, Typography, List, Divider, Cascader } from "antd";
import VirtualList from "rc-virtual-list";
import { useState, useEffect } from "react";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles/style.css";
import { getToDoList, postToDo, deleteToDo, putToDo } from "./api/toDoApi";
import { getCategories } from "./api/categoryApi";
import ToDoModel from "./models/ToDoModel";
import CategoryModel from "./models/CategoryModel";
import type { DefaultOptionType } from "antd/es/cascader";
import OptionModel from "./models/OptionModel";

const { Title } = Typography;

const App: React.FC = () => {
  const [toDos, setToDos]: [
    ToDoModel[],
    React.Dispatch<React.SetStateAction<ToDoModel[]>>
  ] = useState<ToDoModel[]>([]);
  const [categories, setCategories]: [
    CategoryModel[],
    React.Dispatch<React.SetStateAction<CategoryModel[]>>
  ] = useState<CategoryModel[]>([]);

  useEffect((): void => {
    getToDoList(setToDos);
    getCategories(setCategories);
    console.log(categories);
  }, []);

  const [toDo, setToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");
  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  const options: OptionModel[] = [
    {
      value: "kitchen",
      label: "kitchen",
    },
    {
      value: "car",
      label: "car",
    },
  ];

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
              Add ToDo
            </Button>
            <br />
            <br />
            <Cascader
              options={options}
              showSearch={{ filter }}
              onChange={(e) => {
                setCategory(e.toString());
                console.log(category);
              }}
              placeholder="Select category"
            />
            {categories.filter((e) => e.name == category).length == 0 && (
              <Button
                type="primary"
                size="middle"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  console.log(toDo);
                }}
              >
                Add Category
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="center-cont">
        <div className="main-cont">
          {categories?.map((category: CategoryModel) => {
            return (
              <>
                <Divider orientation="left" key={category.id}>
                  {category.name}
                </Divider>
                <List>
                  <VirtualList
                    className="viral-list"
                    data={toDos}
                    //height={400}
                    itemHeight={47}
                    itemKey="id"
                  >
                    {(item: ToDoModel) => {
                      if (item.categoryId == category.id)
                        return (
                          <List.Item key={item.id}>
                            {item.isDone ? (
                              <CheckOutlined
                                style={{ color: "green" }}
                                onClick={(): void => {
                                  let toDoVal: ToDoModel = item;
                                  toDoVal.isDone = !toDoVal.isDone;
                                  putToDo(toDoVal);
                                }}
                              />
                            ) : (
                              <PlusOutlined
                                style={{ color: "blue" }}
                                onClick={(): void => {
                                  let toDoVal: ToDoModel = item;
                                  toDoVal.isDone = !toDoVal.isDone;
                                  putToDo(toDoVal);
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
                        );
                      else return <></>;
                    }}
                  </VirtualList>
                </List>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
