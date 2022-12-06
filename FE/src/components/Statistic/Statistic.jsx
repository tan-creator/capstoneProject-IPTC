import React, { useState } from "react";
import Header from "../Layout/DefaultLayout/Header";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";
// import BarChart from "./BarChart";

export default function Statistic(props) {
  const [todo, setTodo] = useState();
  const [status, setStatus] = useState(false);
  let [list, setList] = useState([]);
  const [id, setId] = useState(null);
  const [isUpdate, setUpdate] = useState(false);
  return (
    <div className="App">
      <div className="row p-5">
        <FormComponent
          todo={todo}
          status={status}
          handleGetTodo={(value) => setTodo(value)}
          handleGetStatus={(value) => setStatus(value)}
          abc={() => {
            if (!isUpdate) {
              list.push({ todo, status, id: Math.random() });
              setList([...list]);
              console.log("Create");
            } else {
              list = list.map((user) => {
                if (user.id == id) {
                  user.todo = todo;
                  user.status = status;
                  return user;
                }
                return user;
              });
              setList([...list]);
            }
          }}
        />
        <TableComponent
          handleUpdate={(id, todo, status) => {
            setTodo(todo);
            setStatus(status);
            setId(id);
            setUpdate(true);
          }}
          array1={list}
          handleDelete={(id) => {
            var index = list.findIndex((user) => user.id === id);
            list.splice(index, 1);
            alert("Ban co chac chan xoa khong?");
            setList([...list]);
          }}
        />
      </div>
    </div>
  );
}
