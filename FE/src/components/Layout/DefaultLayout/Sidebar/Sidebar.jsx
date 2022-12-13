import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
export default function Sidebar() {
    const [closeClass, setCloseClass] = useState("");
    const [account, setAccount] = useState({});

    useEffect(() => {
        const body = document.querySelector("body"),
            sidebar = body.querySelector(".sidebar"),
            searchBtn = body.querySelector(".search-box"),
            modeSwitch = body.querySelector(".toggle-switch"),
            modeText = body.querySelector(".mode-text");
        searchBtn.addEventListener("click", () => {
            sidebar.classList.remove("close");
        });
        modeSwitch.addEventListener("click", () => {
            body.classList.toggle("dark");
            if (body.classList.contains("dark")) {
                console.log(123);
                modeText.innerText = "Light mode";
            } else {
                modeText.innerText = "Dark mode";
            }
        });

        const user = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...user });
    }, []);

    const handleToggle = () => {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar.classList.contains("close")) {
            setCloseClass("");
        } else {
            setCloseClass("close");
        }
    };

    return (
        <div>
            <div className="content">
                <nav className={`sidebar ${closeClass}`}>
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img
                                    src={
                                        window.location.origin + "/img/logo.svg"
                                    }
                                />
                            </span>
                            <div className="text logo-text">
                                <span className="name">IPTC</span>
                                <span className="profession">C1SE.45</span>
                            </div>
                        </div>
                        <i
                            className="bx bx-chevron-right toggle"
                            onClick={handleToggle}
                        />
                    </header>
                    <div className="menu-bar">
                        <div className="menu">
                            <li className="search-box">
                                <i className="bx bx-search icon" />
                                <input type="text" placeholder="Search..." />
                            </li>
                            <ul className="menu-links">
                                <li id="dashboard" className="nav-link">
                                    <a href="/dashboard">
                                        <i className="bx bx-home-alt icon" />
                                        <span className="text nav-text">
                                            Trang chủ
                                        </span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="/chart">
                                        <i className="bx bx-bar-chart-alt-2 icon" />
                                        <span className="text nav-text">
                                            Thống kê
                                        </span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="/noti">
                                        <i className="bx bx-bell icon" />
                                        <span className="text nav-text">
                                            Thông báo
                                        </span>
                                    </a>
                                </li>
                                {account?.Role === "Teacher" && (
                                    <li className="nav-link">
                                        <a href="/grade">
                                            <i className="bx bx-pie-chart-alt icon" />
                                            <span className="text nav-text">
                                                Nhập điểm
                                            </span>
                                        </a>
                                    </li>
                                )}
                                {account?.Role === "Parent" && (
                                    <li className="nav-link">
                                        <a href="/checkpoint">
                                            <i className="bx bx-pie-chart-alt icon" />
                                            <span className="text nav-text">
                                                Xem điểm
                                            </span>
                                        </a>
                                    </li>
                                )}
                                <li className="nav-link">
                                    <a href="/forum">
                                        <i className="bx bx-heart icon" />
                                        <span className="text nav-text">
                                            Diễn đàn
                                        </span>
                                    </a>
                                </li>
                                {account?.Role === "Teacher" && (
                                    <li className="nav-link">
                                        <a href="#">
                                            <i className="bx bx-wallet icon" />
                                            <span className="text nav-text">
                                                Lịch dạy
                                            </span>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="bottom-content">
                            <li id="logout">
                                <a href="/">
                                    <i className="bx bx-log-out icon" />
                                    <span className="text nav-text">
                                        Đăng xuất
                                    </span>
                                </a>
                            </li>
                            <li className="mode">
                                <div className="sun-moon">
                                    <i className="bx bx-moon icon moon" />
                                    <i className="bx bx-sun icon sun" />
                                </div>
                                <span className="mode-text text">Đổi màu</span>
                                <div className="toggle-switch">
                                    <span className="switch" />
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
