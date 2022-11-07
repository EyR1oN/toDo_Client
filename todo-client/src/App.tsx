import React from "react";
import "antd/dist/antd.css";
import { Button, Input, Typography, List, Divider, Cascader } from "antd";
import VirtualList from "rc-virtual-list";
import { useState, useEffect } from "react";
import {
  PlusOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
  PlusSquareOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./styles/style.css";
import { getToDoList, postToDo, deleteToDo, putToDo } from "./api/toDoApi";
import { getCategories, postCategory } from "./api/categoryApi";
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
  }, []);

  const [toDo, setToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");
  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  const [showToDo, setShowToDo]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const [showCategory, setShowCategory]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <div className="center-items">
      <div className="center-cont">
        <div className="header">
          <div>
            <Title level={2}>ToDo List</Title>
            {/* <Input
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
            </Button> */}
            {/* <br />
            <Cascader
              options={options}
              showSearch={{ filter }}
              onChange={(e) => {
                setCategory(e.toString());
              }}
              placeholder="Select category"
            /> */}
            {/* {categories.filter((e) => e.name == category).length == 0 && (
              <Button
                type="primary"
                size="middle"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  console.log(toDo);
                }}
              >
                Add Category
              </Button>
            )} */}
          </div>
        </div>
      </div>

      <div className="center-cont">
        <div className="main-cont">
          <br />
          <div>
            <div className="float-left">
              {showToDo && (
                <>
                  <PlusOutlined
                    style={{ color: "blue" }}
                    onClick={() => setShowToDo(!showToDo)}
                  />
                  <Title level={5}>Add toDo</Title>
                </>
              )}
              {!showToDo && (
                <CloseOutlined
                  style={{ color: "red" }}
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    setShowToDo(!showToDo);
                  }}
                />
              )}
            </div>
            <div className="float-right">
              {showCategory && (
                <>
                  <PlusOutlined
                    style={{ color: "blue" }}
                    onClick={() => setShowCategory(!showCategory)}
                  />
                  <Title level={5}>Add Category</Title>
                </>
              )}
              {!showCategory && (
                <CloseOutlined
                  style={{ color: "red" }}
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    setShowCategory(!showCategory);
                  }}
                />
              )}
            </div>
          </div>

          {!showCategory && (
            <>
              {" "}
              <br />
              <Input
                size="middle"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
                style={{ width: "200px" }}
                placeholder={"add category"}
              />
              <Button
                type="primary"
                size="middle"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  postCategory({ name: category });
                  setShowCategory(!showCategory);
                }}
              >
                Add
              </Button>
            </>
          )}

          {categories?.map((category: CategoryModel) => {
            return (
              <>
                <Divider orientation="left" key={category.id}>
                  {category.name} <EditOutlined /> <DeleteOutlined />
                </Divider>
                {!showToDo && (
                  <>
                    <Input
                      size="middle"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setToDo(e.target.value)
                      }
                      style={{ width: "200px" }}
                      placeholder={"add toDo to " + category.name}
                    />
                    <Button
                      type="primary"
                      size="middle"
                      onClick={(
                        e: React.MouseEvent<HTMLElement, MouseEvent>
                      ) => {
                        console.log(toDo);
                        postToDo({
                          name: toDo,
                          isDone: false,
                          categoryId: category.id,
                        });
                        setShowToDo(!showToDo);
                      }}
                    >
                      Add
                    </Button>
                  </>
                )}

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
                              <CheckSquareOutlined
                                style={{ color: "green" }}
                                onClick={(): void => {
                                  let toDoVal: ToDoModel = item;
                                  toDoVal.isDone = !toDoVal.isDone;
                                  putToDo(toDoVal);
                                }}
                              />
                            ) : (
                              <PlusSquareOutlined
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
                              <CloseSquareOutlined
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
