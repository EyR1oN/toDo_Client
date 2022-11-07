import axios from "axios";
import ToDoModel from "../models/ToDoModel";

const baseURL: string = "https://localhost:44309/";

export async function getToDoList(
  callback: React.Dispatch<React.SetStateAction<ToDoModel[]>>
): Promise<void> {
  await axios
    .get(baseURL + "todo")
    .then(function (response): void {
      callback(response.data);
    })
    .catch(function (error): void {
      console.log(error);
    });
}

export async function postToDo(todoModel: object): Promise<void> {
  await axios
    .post(baseURL + "todo", todoModel)
    .then(function (response): void {
      console.log(response);
    })
    .catch(function (error): void {
      console.log(error);
    });
}

export async function deleteToDo(id: number): Promise<void> {
  console.log(baseURL + `todo?id=${id}`);
  await axios
    .delete(baseURL + `todo?id=${id}`)
    .then(function (response): void {
      console.log(response);
    })
    .catch(function (error): void {
      console.log(error);
    });
}

export async function putToDo(todoModel: ToDoModel): Promise<void> {
  await axios
    .put(baseURL + "todo", todoModel)
    .then(function (response): void {
      console.log(response);
    })
    .catch(function (error): void {
      console.log(error);
    });
}
