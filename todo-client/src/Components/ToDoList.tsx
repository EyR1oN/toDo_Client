import React from "react";
import VirtualList from "rc-virtual-list";
import ToDoModel from "../models/ToDoModel";
import { List } from "antd";
import { useState, useEffect } from "react";
import { getToDoList } from "../api/toDoApi";
import ToDo from "./ToDo";
import MyInput from "./MyInput";

export default function ToDoList({ category }: any) {
  useEffect((): void => {
    getToDoList().then((resp): void => {
      setToDos(resp.data);
    });
  }, []);

  const [toDos, setToDos]: [
    ToDoModel[],
    React.Dispatch<React.SetStateAction<ToDoModel[]>>
  ] = useState<ToDoModel[]>([]);

  return (
    <>
      {!!category.id && <MyInput categ={category} setToDos={setToDos} />}
      <List>
        <VirtualList
          className="viral-list"
          data={toDos}
          itemHeight={47}
          itemKey="id"
        >
          {(item: ToDoModel) => {
            if (item.categoryId == category.id)
              return (
                <List.Item key={item.id} className="list">
                  <ToDo toDo={item} setToDos={setToDos}></ToDo>
                </List.Item>
              );
            else return <></>;
          }}
        </VirtualList>
      </List>
    </>
  );
}
