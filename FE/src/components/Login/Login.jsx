import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { getUser } from "./../../helpers/getUser";
import axios from "axios";
import "./login.css";
export default function Login(props) {
    const [account, set_user] = useState({
        PassWord: "",
        UserName: "",
    });

    let navigate = useNavigate();
    const alert = useAlert();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        set_user((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post(
            "http://127.0.0.1:8000/api/login",
            account,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const user = await result.data;
        const { statusCode, msg } = user;
        localStorage.setItem("account", JSON.stringify(user[0]));
        if (statusCode === 400) {
            alert.error(msg);
        } else {
            navigate("/dashboard");
            alert.success("Đăng nhập thành công!");
        }
    };
    return (
        <div>
            <div className="container">
                <div className="header-login">
                    <div className="header-left">
                        <div className="logo">
                            <img src="./img/logo.svg" alt="#" />
                            <span className="title-header">IPTC</span>
                        </div>
                    </div>
                    <div className="header-right"></div>
                </div>
                <div className="content-login">
                    <div className="content-left-login">
                        <form className="form" id="form-1">
                            <img src="./img/join.svg" alt="" />
                            <h3 className="heading">WELCOME</h3>
                            <div className="spacer" />
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    id="UserName"
                                    name="UserName"
                                    type="text"
                                    placeholder="VD: abc@gmail.com"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                                <span className="form-message" />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    id="password"
                                    name="PassWord"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                                <span className="form-message" />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="form-submit"
                                id="login-btn"
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                    <div className="content-right-login">
                        <img src="./img/img-large.png" alt="#" />
                    </div>
                </div>
                <div className="footer" />
            </div>
        </div>
    );
}
