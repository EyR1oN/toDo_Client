import React from "react";
import {
  CloseSquareOutlined,
  CheckSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import ToDoModel from "../models/ToDoModel";
import { getToDoList, deleteToDo, putToDo, postToDo } from "../api/toDoApi";

export default function ToDo({ toDo }: any) {
  if (toDo.isDone) {
    return (
      <>
        <CheckSquareOutlined
          style={{ color: "green" }}
          onClick={(): void => {
            let toDoVal: ToDoModel = toDo;
            toDoVal.isDone = !toDoVal.isDone;
            putToDo(toDoVal);
          }}
        />
        <div>
          {toDo.name}{" "}
          <CloseSquareOutlined
            style={{ color: "red" }}
            onClick={(): void => {
              deleteToDo(toDo.id);
            }}
          />
        </div>
      </>
    );
  } else
    return (
      <>
        <PlusSquareOutlined
          style={{ color: "blue" }}
          onClick={(): void => {
            let toDoVal: ToDoModel = toDo;
            toDoVal.isDone = !toDoVal.isDone;
            putToDo(toDoVal);
          }}
        />
        <div>
          {toDo.name}{" "}
          <CloseSquareOutlined
            style={{ color: "red" }}
            onClick={(): void => {
              deleteToDo(toDo.id);
            }}
          />
        </div>
      </>
    );
}
