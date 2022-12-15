import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./personal.css";
export default function Personnal() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("account"));
        const students = JSON.parse(localStorage.getItem("students"));
        const classes = JSON.parse(localStorage.getItem("classes"));

        const findStudent = students.find(
            (student) => student?.ParentUserName == user?.UserName
        );
        const findclassID = classes.find(
            (cls) => cls?.classID == user?.classID
        );
        user.childrenName = findStudent?.StudentName;
        user.classID = findStudent?.ClassID;
        user.className = findclassID?.ClassName;
        setAccount({ ...user });
    }, []);
    console.log(account);

    return (
        <div>
            <NavBar />
            <div className="container">
                <Sidebar />
                <div className="Personnal">
                    <div className="func-title-user">
                        <span>THÔNG TIN CÁ NHÂN</span>
                    </div>

                    <div className="info-basic">
                        <div className="info">
                            <div className="txtcel1">
                                {account.Role === "Teacher"
                                    ? "Tên giáo viên: "
                                    : "Tên Cha/Mẹ: "}
                            </div>
                            <div className="txtcel2" id="txtName">
                                <strong>{account.Names}</strong>
                            </div>
                            <div className="txtcel1">Tên đăng nhập</div>
                            <div className="txtcel2" id="txtName">
                                <strong>{account.UserName}</strong>
                            </div>
                            <div className="txtcel1">Tên học sinh:</div>
                            <div className="txtcel2">
                                <span>{account?.childrenName}</span>
                            </div>
                            <div className="txtcel1">Vai trò:</div>
                            <div className="txtcel2">
                                {account.Role === "Teacher"
                                    ? "Giáo viên"
                                    : "Phụ huynh"}
                            </div>
                            {account?.Role === "Parent" && (
                                <>
                                    <div className="txtcel1">Lớp: </div>
                                    <div className="txtcel2">
                                        {account.className}
                                    </div>
                                </>
                            )}

                            <div className="txtcel1">Bằng cấp:</div>
                            <div className="txtcel2">
                                <span>{account.Degree}</span>
                            </div>
                            <div className="txtcel1">Ngày sinh:</div>
                            <div className="txtcel2">
                                <span>{account.BirthDay}</span>
                            </div>

                            <div className="txtcel1">Phone:</div>
                            <div className="txtcel2">{account.Phone}</div>

                            <button
                                type="button"
                                class="btn btn-success"
                                style={{
                                    backgroundColor: "#f48023",
                                    marginTop: "50px",
                                    marginLeft: "200px",
                                    fontSize: 16,
                                }}
                            >
                                CẬP NHẬT
                            </button>
                        </div>
                        <div className="person-img">
                            <img
                                src={account.Images}
                                style={{ width: "200px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
