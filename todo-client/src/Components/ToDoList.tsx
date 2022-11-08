import React from "react";
import VirtualList from "rc-virtual-list";
import ToDoModel from "../models/ToDoModel";
import { Button, Input, Layout, List } from "antd";
import { useState, useEffect } from "react";
import { getToDoList, deleteToDo, putToDo, postToDo } from "../api/toDoApi";
import {
  CloseSquareOutlined,
  CheckSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import CategoryModel from "../models/CategoryModel";
import ToDo from "./ToDo";

export default function ToDoList({ category }: any) {
  useEffect((): void => {
    getToDoList(setToDos);
  }, []);
  const [toDos, setToDos]: [
    ToDoModel[],
    React.Dispatch<React.SetStateAction<ToDoModel[]>>
  ] = useState<ToDoModel[]>([]);
  const [toDo, setToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");
  return (
    <>
      <div className="center-items">
        <Input
          size="middle"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToDo(e.target.value)
          }
          style={{ width: "25%" }}
          placeholder={"add toDo to " + category.name}
        />

        <Button
          type="primary"
          size="middle"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            console.log(toDo);
            postToDo({
              name: toDo,
              isDone: false,
              categoryId: category.id,
            });
          }}
        >
          Add
        </Button>
      </div>
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
                  {/* {item.isDone ? (
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
                  </div> */}
                  <ToDo toDo={item}></ToDo>
                </List.Item>
              );
            else return <></>;
          }}
        </VirtualList>
      </List>
    </>
  );
}
