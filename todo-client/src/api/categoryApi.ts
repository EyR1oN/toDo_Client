import axios from "axios";
import CategoryModel from "../models/CategoryModel";

const baseURL: string = "https://localhost:44309/";

export async function getCategories(
  callback: React.Dispatch<React.SetStateAction<CategoryModel[]>>
): Promise<void> {
  await axios
    .get(baseURL + "category")
    .then(function (response): void {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(function (error): void {
      console.log(error);
    });
}

export async function postCategory(categoryModel: object): Promise<void> {
  await axios
    .post(baseURL + "category", categoryModel)
    .then(function (response): void {
      //  console.log(response);
    })
    .catch(function (error): void {
      console.log(error);
    });
}
