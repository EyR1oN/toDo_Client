import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import CategoryModel from "../models/CategoryModel";
import { deleteCategory, putCategory } from "../api/categoryApi";

export default function Category({ item }: any) {
  const [categoryName, setCategoryName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  const [showEditCategory, setShowEditCategory]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

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
              onClick={() => {
                deleteCategory(item.id);
              }}
            />
          </div>
        </div>
        // <span>ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</span>
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
