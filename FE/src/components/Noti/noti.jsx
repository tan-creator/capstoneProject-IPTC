import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import "./noti.css";
export default function noti() {
    // const [notis, set_notis] = useState([]);
    const [account, setAccount] = useState({});
    const [parent, SetParent] = useState([]);
    useEffect(() => {
        // axios("http://127.0.0.1:8000/api/notification")
        //     .then((response) => response.data)
        //     .then((json) => {
        //         console.log(json);
        //         set_notis([...json]);
        //     });
        const user = JSON.parse(localStorage.getItem("account"));
        const notiss = JSON.parse(localStorage.getItem("notifications"));
        const findParent = notiss.filter(
            (parent) => parent?.ParentUserName == user?.UserName
        );
        console.log(findParent);

        setAccount({ ...user });
        SetParent(...[findParent]);
    }, []);

    console.log(parent);
    return (
        <div>
            <NavBar />
            <div className="container" style={{ height: "1440px" }}>
                <Sidebar />
                <div className="forum-content">
                    <div className="annouce">
                        <span>
                            <i className="bx bxs-notepad" />
                            THÔNG BÁO
                        </span>
                    </div>
                    {parent
                        .sort((a, b) => b.NotificationID - a.NotificationID)
                        .map(function (noti) {
                            return (
                                <div className="box" key={noti.Phone}>
                                    <div className="box-profile">
                                        <img
                                            className="box-img-avatar"
                                            src="./img/avatar.svg"
                                            alt=""
                                        />
                                        <div className="box-info">
                                            <div className="box-user-top">
                                                <h4 className="card-user-name">
                                                    {noti.AdminUserName}
                                                </h4>
                                                <i className="bx bxs-check-circle" />
                                            </div>
                                            <div className="box-user-desc">
                                                {noti.NotificationDate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-question">
                                        <div className="box-main-question">
                                            {noti.NotificationTitle}
                                        </div>
                                        <div className="box-subtitle">
                                            {noti.NotificationContent}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="content-right">
                        <div className="anounce box">
                            <div className="pb10">
                                <i className="bx bxs-notepad" />
                                <span>Lịch</span>
                            </div>
                            <div>
                                <a href="#">
                                    <i className="bx bxs-circle" />
                                    Lịch thi học kỳ I 2022 - 2023
                                </a>
                            </div>
                            <div>
                                <a href="#">
                                    <i className="bx bxs-circle" />
                                    Lịch họp phụ huynh học kỳ I 2022 - 2023
                                </a>
                            </div>
                            {/*  */}

                            <div className="pt10 pb10">
                                <i className="bx bxs-help-circle" />
                                <span>Trợ giúp</span>
                            </div>
                            <div>
                                <a href="#">
                                    <i className="bx bxs-circle" />
                                    Cần giúp đỡ?
                                </a>
                            </div>
                            <div>
                                <a href="#">
                                    <i className="bx bxs-circle" />
                                    Tư vấn tuyển sinh
                                </a>
                            </div>
                            <div>
                                <a href="#">
                                    <i className="bx bxs-circle" />
                                    Thông tin về nhà trường
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
