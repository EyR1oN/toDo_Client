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
import { deleteCategory, getCategories, putCategory } from "../api/categoryApi";

const { confirm } = Modal;
type Props = {
  item: any;
  setCategories: React.Dispatch<React.SetStateAction<CategoryModel[]>>;
};

export default function Category(props: Props) {
  const [refetch, setRefetch] = useState(false);

  useEffect((): void => {
    getCategories(props.setCategories, setRefetch);
  }, [refetch]);

  const [categoryName, setCategoryName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

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
        deleteCategory(props.item.id);
        window.location.reload();
        setRefetch(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
            defaultValue={props.item.name}
            placeholder={"change todo"}
          ></Input>{" "}
          <CheckCircleOutlined
            style={{ color: "green" }}
            onClick={() => {
              let model: CategoryModel = props.item;
              model.name = categoryName;
              putCategory(model);
              setShowEditCategory(!showEditCategory);
            }}
          />
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
