import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./personal.css";
export default function Personnal() {
    const [persons, SetPerson] = useState([]);
    const [users, SetUser] = useState([]);
    const [account, setAccount] = useState({});
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("account"));
        const students = JSON.parse(localStorage.getItem("students"));
        const findStudent = students.find(
            (student) => student?.ParentUserName == user?.UserName
        );
        user.children = findStudent?.StudentName;
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
                            <div className="txtcel1">Tên:</div>
                            <div className="txtcel2" id="txtName">
                                <strong>{account.Names}</strong>
                            </div>
                            <div className="txtcel1">Tên đăng nhập</div>
                            <div className="txtcel2" id="txtName">
                                <strong>{account.UserName}</strong>
                            </div>
                            <div className="txtcel1">Vai trò:</div>
                            <div className="txtcel2" style={{}}>
                                {account.Role}
                            </div>
                            <div className="txtcel1">Lớp:</div>
                            <div className="txtcel2">5</div>
                            <div className="txtcel1">Giới tính:</div>
                            <div className="txtcel2">Nam&nbsp;</div>
                            <div className="txtcel1">Bằng cấp:</div>
                            <div className="txtcel2">
                                <span>{account.Degree}</span>
                            </div>
                            <div className="txtcel1">Ngày sinh:</div>
                            <div className="txtcel2">
                                <span>{account.BirthDay}</span>
                            </div>
                            <div className="txtcel1">Children:</div>
                            <div className="txtcel2">
                                <span>{account?.children}</span>
                            </div>
                            <div className="txtcel1">Phone:</div>
                            <div className="txtcel2">{account.Phone}</div>
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
