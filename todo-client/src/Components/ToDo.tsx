import React, { useState } from "react";
import {
  CloseSquareOutlined,
  CheckSquareOutlined,
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import ToDoModel from "../models/ToDoModel";
import { deleteToDo, putToDo } from "../api/toDoApi";
import { Input, Modal } from "antd";


const { confirm } = Modal;

export default function ToDo({ toDo }: any) {
  const [toDoName, setToDoName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  const [showEditToDo, setShowEditToDo]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteToDo(toDo.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      {toDo.isDone ? (
        <CheckSquareOutlined
          style={{ color: "green", fontSize: "large" }}
          onClick={(): void => {
            let toDoVal: ToDoModel = toDo;
            toDoVal.isDone = !toDoVal.isDone;
            putToDo(toDoVal);
          }}
        />
      ) : (
        <PlusSquareOutlined
          style={{ color: "blue", fontSize: "large" }}
          onClick={(): void => {
            let toDoVal: ToDoModel = toDo;
            toDoVal.isDone = !toDoVal.isDone;
            putToDo(toDoVal);
          }}
        />
      )}
      <div>
        {showEditToDo && (
          <>
            <span className="span-st">{toDo.name}</span>
            <EditOutlined
              style={{ fontSize: "large" }}
              onClick={() => {
                setShowEditToDo(!showEditToDo);
                setToDoName(toDo.name);
              }}
            />{" "}
            <DeleteOutlined
              style={{ fontSize: "large" }}
              onClick={showDeleteConfirm}
            />
          </>
        )}
        {!showEditToDo && (
          <div>
            <Input
              style={{ width: "82%" }}
              size="middle"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToDoName(e.target.value)
              }
              defaultValue={toDo.name}
              placeholder={"change todo"}
            ></Input>{" "}
            <CheckCircleOutlined
              style={{ color: "green", fontSize: "large" }}
              onClick={() => {
                let model: ToDoModel = toDo;
                model.name = toDoName;
                putToDo(model);
              }}
            />
            <CloseSquareOutlined
              style={{ color: "red", fontSize: "large" }}
              onClick={(): void => {
                setShowEditToDo(!showEditToDo);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
