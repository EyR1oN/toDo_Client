import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { getToDoList, postToDo } from "../api/toDoApi";
import ToDoModel from "../models/ToDoModel";

type Props = {
  categ: any;
  setToDos: React.Dispatch<React.SetStateAction<ToDoModel[]>>;
};

export default function MyInput(props: Props) {
  const [toDo, setToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  useEffect((): void => {
    setToDo("");
  }, [props.categ]);

  const [refetch, setRefetch] = useState(false);

  useEffect((): void => {
    getToDoList(props.setToDos, setRefetch);
  }, [refetch]);

  return (
    <div className="center-items">
      <Input
        maxLength={50}
        size="middle"
        value={toDo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setToDo(e.target.value);
          console.log(props.categ);
        }}
        style={{ width: "25%" }}
        placeholder={"add toDo to " + (props.categ.name || "...")}
      />

      <Button
        type="primary"
        size="middle"
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          console.log(toDo);
          postToDo({
            name: toDo,
            isDone: false,
            categoryId: props.categ.id,
          });
          setRefetch(true);
        }}
      >
        Add
      </Button>
    </div>
  );
}
