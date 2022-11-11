import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseSquareOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Input, Modal } from "antd";
import CategoryModel from "../models/CategoryModel";
import { getCategories, putCategory, deleteCategory } from "../api/categoryApi";

const { confirm } = Modal;
type Props = {
  item: any;
  setCategories: React.Dispatch<React.SetStateAction<CategoryModel[]>>;
};

export default function Category(props: Props) {
  useEffect((): void => {
    getCategories().then((resp): void => {
      props.setCategories(resp.data);
    });
  }, []);

  const [categoryName, setCategoryName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>(props.item.name);

  const [showEditCategory, setShowEditCategory]: [
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
        deleteCategory(props.item.id).then((resp) => {
          getCategories().then((resp): void => {
            props.setCategories(resp.data);
          });
        });
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onRename = (): void => {
    let model: CategoryModel = props.item;
    model.name = categoryName;
    putCategory(model).then(function (response): void {
      getCategories().then((resp): void => {
        props.setCategories(resp.data);
      });
    });
    setShowEditCategory(!showEditCategory);
  };

  return (
    <>
      {showEditCategory && (
        <div className="inline-block">
          <span className="float-left">{props.item.name} </span>
          <div className="float-right">
            <EditOutlined
              onClick={() => {
                setShowEditCategory(!showEditCategory);
                setCategoryName(props.item.name);
              }}
            />{" "}
            <DeleteOutlined onClick={showDeleteConfirm} />
          </div>
        </div>
      )}
      {!showEditCategory && (
        <>
          <Input
            maxLength={50}
            size="middle"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategoryName(e.target.value)
            }
            defaultValue={categoryName}
            placeholder={"change todo"}
          ></Input>{" "}
          <CheckCircleOutlined style={{ color: "green" }} onClick={onRename} />
          <CloseSquareOutlined
            style={{ color: "red" }}
            onClick={(): void => {
              setShowEditCategory(!showEditCategory);
            }}
          />
        </>
      )}
    </>
  );
}
