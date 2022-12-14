import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import Student from "../Layout/DefaultLayout/Student/Student";
import NavBar from "../NavBar/NavBar";
export default function Checkpoint() {
    const [students, setStudent] = useState([]);
    useEffect(() => {
        const studentList = JSON.parse(localStorage.getItem("students"));
        setStudent([...studentList]);
    }, []);
    return (
        <div>
            <span>
                <i className="bx bxs-notepad" />
                BẢNG ĐIỂM
            </span>
            <Student role={"parent"} />
        </div>
    );
}
