import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";

export default function App() {
  const [data, setData] = useState([]);

  const getApi = () => {
    fetch("http://127.0.0.1:8000/user")
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("users", JSON.stringify(json));
      });

    fetch("http://127.0.0.1:8000/student")
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("students", JSON.stringify(json));
      });
    fetch("http://127.0.0.1:8000/api/subject")
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("subjects", JSON.stringify(json));
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route?.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </>
  );
}
