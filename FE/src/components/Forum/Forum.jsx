import React from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import { getPost } from "./../../helpers/getUser";
import "./Forum.css";

export default function Forum() {
    const posts = getPost();

    return (
        <div>
            <NavBar />
            <div className="container">
                <Sidebar />
                <div className="forum-content" style={{ width: "800px" }}>
                    {posts.data.map((post) => (
                        <div className="box" key={post.PostID}>
                            <div className="box-profile">
                                <img
                                    className="box-img-avatar"
                                    src="./img/avatar.svg"
                                    alt=""
                                />
                                <div className="box-info">
                                    <div className="box-user-top">
                                        <h4 className="card-user-name">
                                            {post.UserName}
                                        </h4>
                                        <i className="bx bxs-check-circle" />
                                    </div>
                                    <div className="box-user-desc">
                                        {post.PostTime}
                                    </div>
                                </div>
                            </div>
                            <div className="box-question">
                                <div className="box-main-question">
                                    {post.Content}
                                </div>
                                <div className="box-subtitle">
                                    <img
                                        src={post.PostImage}
                                        style={{
                                            width: "700px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className="format-icon"
                                style={{
                                    borderBottom:
                                        "1px solid rgb(235, 228, 228)",
                                }}
                            >
                                <div className="action1 first">
                                    <i className="bx bxs-like "></i>
                                    <h5>29K</h5>
                                </div>
                                <div className="action1">
                                    <i className="bx bxs-chat"></i>
                                    <h5>1,4K Lượt thích</h5>
                                </div>
                                <div className="action1">
                                    <i className="bx bxs-share"></i>
                                    <h5>118 Lượt chia sẻ</h5>
                                </div>
                            </div>
                            <div className="box-icon">
                                <div className="action">
                                    <i className="bx bx-like"></i>
                                    <h4>Thích</h4>
                                </div>
                                <div className="action">
                                    <i className="bx bx-chat"></i>
                                    <h4>Bình luận</h4>
                                </div>
                                <div className="action">
                                    <i className="bx bx-share"></i>
                                    <h4>Chia sẻ</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
