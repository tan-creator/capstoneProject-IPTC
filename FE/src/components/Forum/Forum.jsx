import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import { getPost } from "./../../helpers/getUser";
import { Spin } from "antd";
import "./Forum.css";
import { useLayoutEffect } from "react";

export default function Forum() {
    const [account, setAccount] = useState({})
    const [users, setUsers] = useState([])
    const [isLoadingHeaderPost, setIsLoadingHeaderPost] = useState(true)
    const [dataSend, setDataSend] = useState();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...user })

        fetch("http://127.0.0.1:8000/api/user")
            .then(response => response.json())
            .then(json => {
                setUsers(json)
                setIsLoadingHeaderPost(false)
            })
            .catch(error => console.log('error', error));
    }, [])
    const posts = getPost();

    const handleGetPostId = (data) => {
        setDataSend(data);
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <Sidebar />
                <div className="forum-content" style={{ width: "800px" }}>
                    {posts.map((post) => (
                        <div className="box-post" key={post.PostID}>
                            {isLoadingHeaderPost ? <Spin /> :
                                <>
                                    <div className="box-profile">
                                        {
                                            users.map((user) => {
                                                if (user.UserName == post.UserName) {
                                                    return (
                                                        <div className="box-post-header">
                                                            <img
                                                                className="box-post-header-avatar"
                                                                src={user.Images}
                                                                alt=""
                                                            />
                                                            <div className="box-info">
                                                                <div className="box-user-top">
                                                                    <h4 className="card-user-name">
                                                                        {user.Names}
                                                                    </h4>
                                                                    <i className="bx bxs-check-circle" />
                                                                </div>
                                                                <div className="box-user-desc">
                                                                    {post.PostTime}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="box-question">
                                        <div className="box-content">
                                            {post.Content}
                                        </div>
                                        <div className="box-subtitle">
                                            <img
                                                src={post.PostImage}
                                                style={{
                                                    width: "100%",
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
                                        {/* <Like likes={post.Likes.length} /> */}
                                        <div className="action1 first" >
                                            <i className="bx bxs-like "></i>
                                            <h4>{post.Likes.length}</h4>
                                        </div>
                                        {/* <Comment comment={post} /> */}
                                        <div className="action1 first">
                                            <i className="bx bxs-chat "></i>
                                            <h4>{post.Comments.length}</h4>
                                        </div>
                                    </div>
                                    <div
                                        className="box-icon"
                                    >
                                        <FunctionLike post={post} UserName={account.UserName} />
                                        <div className="action" onClick={() => { handleGetPostId(post) }}>
                                            <i className="bx bx-chat"></i>
                                            <h4 >Bình luận</h4>
                                        </div>
                                    </div>
                                    <FunctionComment data={dataSend} />
                                    <div className="box-comment">
                                        <img
                                            className="box-img-avatar"
                                            src={account.Images}
                                            alt=""
                                        />
                                        <form
                                            className="form-comment"
                                            action=""
                                            method="POST"
                                            role="form"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                console.log(e.target[0].value);
                                            }}
                                        >
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name=""
                                                    placeholder="Viết bình luận: "
                                                    style={{ width: "400px" }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

function Like(props) {
    // const [posts, setPosts] = useState()
    // const [likes, setLikes] = useState(0)

    // useLayoutEffect(() => {

    // }, [props.PostID])

    return (
        <div className="action1 first">
            <i className="bx bxs-like "></i>
            <h5>{props.likes}</h5>
        </div>
    )
}

function Comment(props) {
    const [data, setData] = useState(props.comment)

    useLayoutEffect(() => {
        if (props.comment != data) {
            setData(props.comment)
        }
    }, [props.comment])

    return (
        <div className="action1 first">
            <i className="bx bxs-chat "></i>
            <h4>{data.Comments.length}</h4>
        </div>
    )
}

function FunctionLike({ post, UserName }) {
    const [styleIconLike, setStyleIconLike] = useState("bx bx-like")
    const [styleH4Like, setStyleH4Like] = useState(false)

    useLayoutEffect(() => {
        post.Likes.map((like) => {
            if (like.PersonUserName == UserName) {
                setStyleIconLike("bx bxs-like");
                setStyleH4Like(true)
            }
        })
    }, [post])

    const onHandleLike = () => {
        post.Likes.map((like) => {
            if (like.PersonUserName == UserName) {
                setActive(true)
            }
        })
        let dataSend = {
            PostID: post.PostID,
            PersonUserName: UserName,
        }
        if (styleH4Like) {
            console.log(dataSend);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json ; charset=UTF-8' },
                body: JSON.stringify({ ...dataSend })
            };
            fetch(`http://127.0.0.1:8000/api/post/dislike`, requestOptions)
                .then((response) => {
                    if (response.status == 200) {
                        console.log("ok dislike");
                        setStyleIconLike("bx bx-like")
                        setStyleH4Like(false)
                    } else {
                        console.log("not ok dislike");
                    }
                })
                .catch(error => {
                    console.log('error', error)
                });
        }
        if (!styleH4Like) {
            console.log(dataSend);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json ; charset=UTF-8' },
                body: JSON.stringify({ ...dataSend })
            };
            fetch(`http://127.0.0.1:8000/api/post/like`, requestOptions)
                .then((response) => {
                    if (response.status == 200) {
                        console.log("ok like");
                        setStyleIconLike("bx bxs-like")
                        setStyleH4Like(true)
                    } else {
                        console.log("not ok like");
                    }
                })
                .catch(error => {
                    console.log('error', error)
                });
        }
    }

    return (
        <div className="action" onClick={onHandleLike}>
            <i className={styleIconLike}></i>
            <h4>{styleH4Like ? "Đã thích" : "Thích"}</h4>
        </div>
    )
}

function FunctionComment({ post }) {

    console.log(post);
    return (
        <div>
            {/* {
                post.Comments.map((cmt) => {
                    return (
                        <div>
                            <p>cmt.PersonUserName</p>
                            <p>cmt.CommentContent</p>
                        </div>
                    )
                })
            } */}
        </div>

    )
}
