import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { postToDo } from '../api/toDoApi';

export default function MyInput({categ}: any) {
    const [toDo, setToDo]: [
        string,
        React.Dispatch<React.SetStateAction<string>>
      ] = useState<string>("");

      useEffect((): void => {
        setToDo('');
      }, [categ]);
    
  return (
    <div className="center-items">
        <Input
          maxLength={50}
          size="middle"
          value={toDo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
            setToDo(e.target.value);
            console.log(categ);
          }
          }
          style={{ width: "25%" }}
          placeholder={"add toDo to " + (categ.name || '...')}
        />

        <Button
          type="primary"
          size="middle"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            console.log(toDo);
            postToDo({
              name: toDo,
              isDone: false,
              categoryId: categ.id,
            });
          }}
        >
          Add
        </Button>
      </div>
  )
}
