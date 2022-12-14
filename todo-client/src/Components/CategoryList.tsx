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
  const [categories, setCategories]: [
    CategoryModel[],
    React.Dispatch<React.SetStateAction<CategoryModel[]>>
  ] = useState<CategoryModel[]>([]);

  useEffect((): void => {
    getCategories().then((resp): void => {
      setCategories(resp.data);
    });
  }, []);

  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  const onAdd = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    postCategory({ name: category })
      .then(function (response): void {
        getCategories().then((resp): void => {
          setCategories(resp.data);
        });
      })
      .catch(function (error): void {
        console.log(error);
      });
  };

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
          onAdd(e);
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
