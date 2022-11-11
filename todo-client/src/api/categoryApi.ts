import axios, { AxiosResponse } from "axios";
import CategoryModel from "../models/CategoryModel";

const baseURL: string = "https://localhost:44309/";

export async function getCategories(): Promise<AxiosResponse<any, any>> {
  return await axios.get(baseURL + "category");
}

export function postCategory(categoryModel: object): Promise<void> {
  return axios.post(baseURL + "category", categoryModel);
}

export async function deleteCategory(
  id: number
): Promise<AxiosResponse<any, any>> {
  return await axios.delete(baseURL + `category?id=${id}`);
}

export async function putCategory(categoryModel: CategoryModel): Promise<void> {
  await axios.put(baseURL + "category", categoryModel);
}
