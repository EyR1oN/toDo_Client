import React from "react";
import VirtualList from "rc-virtual-list";
import ToDoModel from "../models/ToDoModel";
import { Button, Input, List } from "antd";
import { useState, useEffect } from "react";
import { getToDoList, postToDo } from "../api/toDoApi";
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
