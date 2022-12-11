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
                    {posts.map((post) => (
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
                                        {post.BirthDay}
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
                                        style={{ width: "800px" }}
                                    />
                                </div>
                            </div>
                            <div className="box-icon">
                                <div className="action">
                                    <i className="bx bx-like"></i>
                                    <h4>Like</h4>
                                </div>
                                <div className="action">
                                    <i className="bx bx-comment-dots"></i>
                                    <h4>Comment</h4>
                                </div>
                                <div className="action">
                                    <i className="bx bx-share"></i>
                                    <h4>Share</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
