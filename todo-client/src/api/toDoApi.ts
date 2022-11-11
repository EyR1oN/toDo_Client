import axios, { AxiosResponse } from "axios";
import ToDoModel from "../models/ToDoModel";

const baseURL: string = "https://localhost:44309/";

export async function getToDoList(): Promise<AxiosResponse<any, any>> {
  return await axios.get(baseURL + "todo");
}

export async function postToDo(todoModel: object): Promise<void> {
  await axios.post(baseURL + "todo", todoModel);
}

export async function deleteToDo(id: number): Promise<void> {
  return await axios.delete(baseURL + `todo?id=${id}`);
}

export async function putToDo(todoModel: ToDoModel): Promise<void> {
  return await axios.put(baseURL + "todo", todoModel);
}
