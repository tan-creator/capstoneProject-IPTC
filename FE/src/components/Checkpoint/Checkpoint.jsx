import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
export default function Checkpoint() {
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
                    }}
                >
                    <span>
                        <i className="bx bxs-notepad" />
                        BẢNG ĐIỂM
                    </span>
                </div>
            </div>
        </div>
    );
}
