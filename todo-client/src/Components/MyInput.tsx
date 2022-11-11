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

  useEffect((): void => {
    getToDoList().then((resp): void => {
      props.setToDos(resp.data);
    });
  }, []);

  const onAdd = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    postToDo({
      name: toDo,
      isDone: false,
      categoryId: props.categ.id,
    }).then(function (response): void {
      getToDoList().then((resp): void => {
        props.setToDos(resp.data);
      });
    });
  };

  return (
    <div className="center-items">
      <Input
        maxLength={50}
        size="middle"
        value={toDo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setToDo(e.target.value);
        }}
        style={{ width: "25%" }}
        placeholder={"add toDo to " + (props.categ.name || "...")}
      />

      <Button
        type="primary"
        size="middle"
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          onAdd(e);
        }}
      >
        Add
      </Button>
    </div>
  );
}
