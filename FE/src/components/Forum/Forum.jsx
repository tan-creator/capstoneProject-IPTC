import React from "react";
import { useState, useEffect, useLayoutEffect, memo } from "react";
import { useAlert } from "react-alert";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import { getPost } from "./../../helpers/getUser";
import { Spin, Avatar } from "antd";
import { getUser } from "./../../helpers/getUser";
import "./Forum.css";

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
                                                            <div className="box-info-post">
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
                                    <FunctionPost PostID={post.PostID} UserName={account.UserName} UserIMG={account.Images} />
                                </>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

const FunctionPost = memo(({ PostID, UserName, UserIMG }) => {
    const [posts, setPosts] = useState([]);
    const [active, setActive] = useState(false)
    const [cmtSend, setCmtSend] = useState({
        PostID: "",
        CommentContent: "",
        PersonUserName: "",
    })
    const alertNav = useAlert();

    useLayoutEffect(() => {
        fetch(`http://127.0.0.1:8000/api/post`)
            .then(response => response.json())
            .then(json => {
                setPosts(json)
            })
            .catch(error => console.log('error', error));
    }, [posts])

    function getPost() {
        let obj = {}
        posts.map((post) => {
            if (post.PostID == PostID) {
                obj = { ...post };
            }
        })
        return obj;
    }

    function Like({ likes }) {
        return (
            <div className="action1 first">
                <i className="bx bxs-like "></i>
                <h5>{likes}</h5>
            </div>
        )
    }

    function Comment({ comments }) {
        return (
            <div className="action1 first">
                <i className="bx bxs-chat "></i>
                <h4>{comments}</h4>
            </div>
        )
    }

    function FunctionLike({ post, UserName }) {
        const [styleIconLike, setStyleIconLike] = useState("bx bx-like")
        const [styleH4Like, setStyleH4Like] = useState(false)

        useLayoutEffect(() => {
            post.Likes?.map((like) => {
                if (like.PersonUserName == UserName) {
                    setStyleIconLike("bx bxs-like");
                    setStyleH4Like(true)
                }
            })
        }, [post])

        const onHandleLike = () => {
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
                        alertNav.error("Bỏ thích thất bại");
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
                            alertNav.error("Thích thất bại");
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

    const FunctionComment = memo(({ post }) => {
        const [postComment, setPostComment] = useState({})
        const [isLoading, setIsLoading] = useState(true)

        useLayoutEffect(() => {
            if (post !== postComment) {
                setPostComment(post)
            }
        }, [post])

        getUser().map((user) => {
            postComment.Comments?.map((cmt) => {
                if (cmt.PersonUserName == user.UserName) {
                    cmt.Names = user.Names
                }
            })
        })

        return (
            <div key={post.PostID} className="box-person-comment">
                {
                    postComment.Comments?.map((cmt) => {
                        return (
                            <div key={cmt.CommentID} className="item-person-comment">
                                <div>
                                    <Avatar src={cmt?.Images}>{cmt?.Images ? '' : cmt?.PersonUserName.charAt(0)?.toUpperCase()}</Avatar>
                                </div>
                                <div className="content-person-comment">
                                    <p style={{ fontWeight: 600 }}>{cmt?.Names}</p>
                                    <p>{cmt?.CommentContent}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    })

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCmtSend((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    const onHandleComment = (UserName, id) => {
        cmtSend.PostID = id;
        cmtSend.PersonUserName = UserName;
        if (!cmtSend.CommentContent) {
            alert("Nội dung đang trống")
            return;
        }
        console.log(cmtSend);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json ; charset=UTF-8' },
            body: JSON.stringify({ ...cmtSend })
        };
        fetch(`http://127.0.0.1:8000/api/post/comment`, requestOptions)
            .then((response) => {
                if (response.status == 200) {
                    console.log("ok");
                    alertNav.success("Đã bình luận");
                } else {
                    console.log("not ok");
                    alertNav.error("Không thể bình luận");
                }
            })
            .catch(error => {
                console.log('error', error)
                alertNav.error("Bỏ thích thất bại");
            });
    }

    return (
        <>
            <div
                className="format-icon"
                style={{
                    borderBottom:
                        "1px solid rgb(235, 228, 228)",
                }}
            >
                <Like likes={getPost().Likes?.length} />
                <Comment comments={getPost().Comments?.length} />
            </div>
            <div
                className="box-icon"
            >
                <FunctionLike post={getPost()} UserName={UserName} />
                <div className="action"
                    onClick={() => {
                        active ? setActive(false) : setActive(true)
                    }}>
                    <i className="bx bx-chat"></i>
                    <h4 >Bình luận</h4>
                </div>
            </div>
            {active && <FunctionComment post={getPost()} />}
            <div className="box-comment">
                <img
                    className="box-img-avatar"
                    src={UserIMG}
                    alt=""
                />
                <form
                    className="form-comment"
                    action=""
                    method="POST"
                    role="form"
                >
                    <div className="form-group-comment">
                        <input
                            type="text"
                            className="form-control-comment"
                            name="CommentContent"
                            value={cmtSend.CommentContent}
                            onChange={handleOnChange}
                            placeholder="Viết bình luận..."
                            style={{ width: "400px" }}
                        />
                        <div
                            className="btn-comment"
                            onClick={() => { onHandleComment(UserName, getPost().PostID) }}
                        >Gửi
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
})
