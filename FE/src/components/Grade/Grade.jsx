import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import "./Grade.css";
export default function Grade() {
    const [students, setStudent] = useState([]);
    const [classes, setClasses] = useState([]);
    const [account, setAccount] = useState({});
    useEffect(() => {
        const account = JSON.parse(localStorage.getItem("account"));
        axios
            .get("http://127.0.0.1:8000/api/class")
            .then((res) => res.data)
            .then((data) => {
                const classes = data.filter(
                    (cls) => cls.TeacherClassUserName == account.UserName
                );

                setClasses([...classes]);
            });
    }, []);

    const handlePickClass = (classId) => {
        const studentList = JSON.parse(localStorage.getItem("students"));
        const findStudentByClassId = studentList.filter(
            (student) => student.ClassID == classId
        );

        setStudent([...findStudentByClassId]);
    };
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
                    }}
                >
                    <span>
                        <i className="bx bxs-notepad" />
                        DANH SÁCH LỚP ĐANG DẠY
                    </span>
                </div>
                <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                    style={{
                        width: 900,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {classes.map((cl) => {
                        return (
                            <button
                                onClick={() => handlePickClass(cl?.ClassID)}
                                type="button"
                                className="btn btn-secondary"
                            >
                                {cl?.ClassName}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="grade">
                <div
                    className="annouce"
                    style={{
                        marginTop: 50,
                        marginBottom: 50,
                    }}
                >
                    <span>
                        <i className="bx bxs-notepad" />
                        DANH SÁCH HỌC SINH
                    </span>
                </div>
                <table className="table table-hover" style={{ fontSize: 25 }}>
                    <thead>
                        <tr>
                            <th>Mã học sinh</th>
                            <th>Tên tài khoản</th>
                            {/* <th>Lớp</th> */}
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
                                    {/* <td>{student?.ClassID}</td> */}
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
