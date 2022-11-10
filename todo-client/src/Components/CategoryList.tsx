import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, List } from "antd";
import VirtualList from "rc-virtual-list";
import CategoryModel from "../models/CategoryModel";
import { getCategories, postCategory } from "../api/categoryApi";
import Category from "./Category";

type Props = {
  chosenCategory: Dispatch<SetStateAction<CategoryModel>>;
};

export default function CategoryList(props: Props) {
  const [refetch, setRefetch] = useState(false);
  const [categories, setCategories]: [
    CategoryModel[],
    React.Dispatch<React.SetStateAction<CategoryModel[]>>
  ] = useState<CategoryModel[]>([]);

  useEffect((): void => {
    getCategories(setCategories, setRefetch);
  }, [refetch]);

  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  return (
    <>
      <div className="center-cont">
        <div className="header-categories">
          <div>
            <h2 className="font font-size-medium">Categories</h2>
          </div>
        </div>
      </div>
      <Input
        maxLength={50}
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
          setRefetch(true);
        }}
      >
        Add
      </Button>
      <List>
        <VirtualList
          className="viral-list"
          data={categories}
          itemHeight={47}
          itemKey="id"
        >
          {(item: CategoryModel) => {
            return (
              <List.Item
                key={item.id}
                onClick={() => props.chosenCategory(item)}
                className={"center-items pointer list"}
              >
                <Category item={item} setCategories={setCategories} />
              </List.Item>
            );
          }}
        </VirtualList>
      </List>
    </>
  );
}
