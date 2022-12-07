import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/Main";
import "./grade.css";
export default function Grade() {
    const [students, setStudent] = useState([]);
    useEffect(() => {
        const studentList = JSON.parse(localStorage.getItem("students"));
        setStudent([...studentList]);
    }, []);
    return (
        <div>
            <NavBar />
            <Sidebar />

            <div className="grade">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>StudentID</th>
                            <th>ParentUserName</th>
                            <th>ClassID</th>
                            <th>StudentName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            return (
                                <tr>
                                    <Link to={`/student/${student?.ClassID}`}>
                                        <td>{student?.StudentID}</td>
                                    </Link>
                                    <td>{student?.ParentUserName}</td>
                                    <td>{student?.ClassID}</td>
                                    <td>{student?.StudentName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}
