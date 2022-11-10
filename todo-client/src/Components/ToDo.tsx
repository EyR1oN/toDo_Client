import React, { useEffect, useState } from "react";
import {
  CloseSquareOutlined,
  CheckSquareOutlined,
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ToDoModel from "../models/ToDoModel";
import { deleteToDo, getToDoList, putToDo } from "../api/toDoApi";
import { Input, Modal } from "antd";

const { confirm } = Modal;
type Props = {
  toDo: any;
  setToDos: React.Dispatch<React.SetStateAction<ToDoModel[]>>;
};

export default function ToDo(props: Props) {
  const [refetch, setRefetch] = useState(false);

  const [toDoName, setToDoName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  useEffect((): void => {
    getToDoList(props.setToDos, setRefetch);
  }, [refetch]);

  const [showEditToDo, setShowEditToDo]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteToDo(props.toDo.id);
        setRefetch(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {props.toDo.isDone ? (
        <CheckSquareOutlined
          style={{ color: "green", fontSize: "large" }}
          onClick={(): void => {
            let toDoVal: ToDoModel = props.toDo;
            toDoVal.isDone = !toDoVal.isDone;
            putToDo(toDoVal);
            setRefetch(true);
          }}
        />
      ) : (
        <PlusSquareOutlined
          style={{ color: "blue", fontSize: "large" }}
          onClick={(): void => {
            let toDoVal: ToDoModel = props.toDo;
            toDoVal.isDone = !toDoVal.isDone;
            putToDo(toDoVal);
            setRefetch(true);
          }}
        />
      )}
      <div>
        {showEditToDo && (
          <>
            <span className="span-st">{props.toDo.name}</span>
            <EditOutlined
              style={{ fontSize: "large" }}
              onClick={() => {
                setShowEditToDo(!showEditToDo);
                setToDoName(props.toDo.name);
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
              defaultValue={props.toDo.name}
              placeholder={"change todo"}
            ></Input>{" "}
            <CheckCircleOutlined
              style={{ color: "green", fontSize: "large" }}
              onClick={() => {
                let model: ToDoModel = props.toDo;
                model.name = toDoName;
                putToDo(model);
                setRefetch(true);
                setShowEditToDo(!showEditToDo);
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
