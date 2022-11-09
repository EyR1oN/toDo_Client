import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseSquareOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { Input, Modal } from "antd";
import CategoryModel from "../models/CategoryModel";
import { deleteCategory, putCategory } from "../api/categoryApi";

const { confirm } = Modal;

export default function Category({ item }: any) {
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
      title: 'Are you sure delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteCategory(item.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  return (
    <>
      {showEditCategory && (
        <div className="inline-block">
          <span className="float-left">{item.name} </span>
          <div className="float-right">
            <EditOutlined
              onClick={() => {
                setShowEditCategory(!showEditCategory);
                setCategoryName(item.name);
              }}
            />{" "}
            <DeleteOutlined
              onClick={showDeleteConfirm}
            />
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
            defaultValue={item.name}
            placeholder={"change todo"}
          ></Input>{" "}
          <CheckCircleOutlined
            style={{ color: "green" }}
            onClick={() => {
              let model: CategoryModel = item;
              model.name = categoryName;
              putCategory(model);
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
