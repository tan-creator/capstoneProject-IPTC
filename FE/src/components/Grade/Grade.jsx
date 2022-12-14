import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import "./Grade.css";
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
                <div
                    className="annouce"
                    style={{
                        marginTop: 50,
                        marginBottom: 50,
                    }}>
                    <span>
                        <i className="bx bxs-notepad" />
                        DANH SÁCH HỌC SINH
                    </span>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã học sinh</th>
                            <th>Tên tài khoản</th>
                            <th>Lớp</th>
                            <th>Tên học sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            return (
                                <tr>
                                    <Link to={`/student/${student?.StudentID}`}>
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
