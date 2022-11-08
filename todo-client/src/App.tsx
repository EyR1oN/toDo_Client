import React from "react";
import "antd/dist/antd.css";
import {
  Button,
  Input,
  Typography,
  List,
  Divider,
  Cascader,
  Layout,
  Menu,
  MenuProps,
} from "antd";
import { useState, useEffect } from "react";
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./styles/style.css";
import "antd/dist/antd.css";
import { postToDo } from "./api/toDoApi";
import { deleteCategory, getCategories, postCategory } from "./api/categoryApi";
import CategoryModel from "./models/CategoryModel";
import ToDo from "./Components/ToDoList";
import Header from "./Components/Header";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuComponent from "./Components/MenuComponent";

const { Title } = Typography;

const App: React.FC = () => {
  const [categories, setCategories]: [
    CategoryModel[],
    React.Dispatch<React.SetStateAction<CategoryModel[]>>
  ] = useState<CategoryModel[]>([]);

  useEffect((): void => {
    getCategories(setCategories);
  }, []);

  const [toDo, setToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");
  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");

  const [showToDo, setShowToDo]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const [showCategory, setShowCategory]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const [showEditCategory, setShowEditCategory]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  return (
    <MenuComponent></MenuComponent>
    // <div className="center-items">
    // <Header/>
    //   <div className="center-cont">
    //     <div className="main-cont">
    //       <br />
    //       <div>
    //         <div className="float-left">
    //           {showToDo && (
    //             <>
    //               <PlusOutlined
    //                 style={{ color: "blue" }}
    //                 onClick={() => setShowToDo(!showToDo)}
    //               />
    //               <Title level={5}>Add toDo</Title>
    //             </>
    //           )}
    //           {!showToDo && (
    //             <CloseOutlined
    //               style={{ color: "red" }}
    //               onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //                 setShowToDo(!showToDo);
    //               }}
    //             />
    //           )}
    //         </div>
    //         <div className="float-right">
    //           {showCategory && (
    //             <>
    //               <PlusOutlined
    //                 style={{ color: "blue" }}
    //                 onClick={() => setShowCategory(!showCategory)}
    //               />
    //               <Title level={5}>Add Category</Title>
    //             </>
    //           )}
    //           {!showCategory && (
    //             <CloseOutlined
    //               style={{ color: "red" }}
    //               onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //                 setShowCategory(!showCategory);
    //               }}
    //             />
    //           )}
    //         </div>
    //       </div>

    //       {!showCategory && (
    //         <>
    //           {" "}
    //           <br />
    //           <Input
    //             size="middle"
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //               setCategory(e.target.value)
    //             }
    //             style={{ width: "200px" }}
    //             placeholder={"add category"}
    //           />
    //           <Button
    //             type="primary"
    //             size="middle"
    //             onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //               postCategory({ name: category });
    //               setShowCategory(!showCategory);
    //             }}
    //           >
    //             Add
    //           </Button>
    //         </>
    //       )}

    //       {categories?.map((category: CategoryModel) => {
    //         return (
    //           <>
    //             <Divider orientation="left" key={category.id}>
    //               {!showEditCategory && (
    //                 <Input
    //                   size="middle"
    //                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //                     setCategory(e.target.value)
    //                   }
    //                   style={{ width: "200px" }}
    //                   placeholder={"change name of category"}
    //                 />
    //               )}
    //               {showEditCategory && category.name}{" "}
    //               <EditOutlined
    //                 onClick={() => setShowEditCategory(!showEditCategory)}
    //               />{" "}
    //               <DeleteOutlined onClick={() => deleteCategory(category.id)} />
    //             </Divider>
    //             {!showToDo && (
    //               <>
    //                 <Input
    //                   size="middle"
    //                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //                     setToDo(e.target.value)
    //                   }
    //                   style={{ width: "200px" }}
    //                   placeholder={"add toDo to " + category.name}
    //                 />
    //                 <Button
    //                   type="primary"
    //                   size="middle"
    //                   onClick={(
    //                     e: React.MouseEvent<HTMLElement, MouseEvent>
    //                   ) => {
    //                     console.log(toDo);
    //                     postToDo({
    //                       name: toDo,
    //                       isDone: false,
    //                       categoryId: category.id,
    //                     });
    //                     setShowToDo(!showToDo);
    //                   }}
    //                 >
    //                   Add
    //                 </Button>
    //               </>
    //             )}
    //             <ToDo categoryId={category.id}></ToDo>
    //           </>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
};

export default App;
