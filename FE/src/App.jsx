import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
export default function App() {
    const [data, setData] = useState([]);

    const getApi = () => {
        fetch("http://127.0.0.1:8000/api/user")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("users", JSON.stringify(json));
            });
        // fetch("http://127.0.0.1:8000/api/Point/all")
        //     .then((response) => response.json())
        //     .then((json) => {
        //         localStorage.setItem("points", JSON.stringify(json));
        //     });

        fetch("http://127.0.0.1:8000/api/student")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("students", JSON.stringify(json));
            });
        fetch("http://127.0.0.1:8000/api/notification")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("notifications", JSON.stringify(json));
            });
        fetch("http://127.0.0.1:8000/api/post")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("posts", JSON.stringify(json));
            });
        fetch("http://127.0.0.1:8000/api/class")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("classes", JSON.stringify(json));
            });

        fetch("http://127.0.0.1:8000/api/subject")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("subjects", JSON.stringify(json));
            });

        fetch("http://127.0.0.1:8000/api/permission")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("permissions", JSON.stringify(json));
            });

        fetch("http://127.0.0.1:8000/api/cost")
            .then(response => response.json())
            .then(json => {
                localStorage.setItem("costs", JSON.stringify(json));
            })
            .catch(error => console.log('error', error));
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
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route?.path == "/student/:id" ? (
                                        <Page role={"teacher"} />
                                    ) : (
                                        <Page />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </>
    );
}
