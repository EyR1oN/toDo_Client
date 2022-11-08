import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, List } from "antd";
import VirtualList from "rc-virtual-list";
import CategoryModel from "../models/CategoryModel";
import { getCategories, postCategory } from "../api/categoryApi";
import Category from "./Category";
import { Typography } from "antd";

type Props = {
  chosenCategory: Dispatch<SetStateAction<CategoryModel>>;
};

const { Title } = Typography;

export default function CategoryList(props: Props) {
  const [categories, setCategories]: [
    CategoryModel[],
    React.Dispatch<React.SetStateAction<CategoryModel[]>>
  ] = useState<CategoryModel[]>([]);
  useEffect((): void => {
    getCategories(setCategories);
  }, []);

  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  return (
    <>
      <div className="center-cont">
        <div className="header-categories">
          <div>
            <Title level={5}>Categories</Title>
          </div>
        </div>
      </div>
      <Input
        size="middle"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCategory(e.target.value)
        }
        style={{ width: "calc(100% - 58px) " }}
        placeholder={"add category"}
      />

      <Button
        type="primary"
        size="middle"
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          console.log(category);
          postCategory({ name: category });
        }}
      >
        Add
      </Button>
      <List>
        <VirtualList
          className="viral-list"
          data={categories}
          //height={400}
          itemHeight={47}
          itemKey="id"
        >
          {(item: CategoryModel) => {
            return (
              <List.Item
                key={item.id}
                onClick={() => props.chosenCategory(item)}
                className={"center-items pointer"}
              >
                <Category item={item} />
              </List.Item>
            );
          }}
        </VirtualList>
      </List>
    </>
  );
}
