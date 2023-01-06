import React, { useEffect, useState, useLayoutEffect, memo } from "react";
import { useAlert } from "react-alert";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import "./form.css"
import { Spin, Collapse, Typography } from "antd";
import { getStudent, getClass, getUser, getPermission } from "../../helpers/getUser";

function Form() {
    const [classes, setClass] = useState([]);
    const [users, setUser] = useState([])
    const [account, setAccount] = useState({})
    const [student, setStudent] = useState([])
    const [permission, setPermission] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const alertNav = useAlert();

    useEffect(() => {

        setStudent(getStudent());
        setClass(getClass());
        setUser(getUser());
        // setPermission(getPermission())

        fetch("http://127.0.0.1:8000/api/permission")
            .then(response => response.json())
            .then(json => {
                setPermission(json)
                setIsLoading(false)
            })
            .catch(error => console.log('error', error));

        const users = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...users })
        console.log("Thong tin account\n" + account);

    }, []);

    const [form, setForm] = useState({
        StudentID: "",
        PermissionDay: "",
        PermissionContent: ""
    })

    function getTeacherName() {
        let idClass = "";
        let idTeacher = "";
        let teacherClassName = ""
        student?.map((std) => {
            if (account.UserName == std.ParentUserName) {
                idClass = std.ClassID;
            }
        })

        classes?.map((cls) => {
            if (cls.ClassID == idClass) {
                idTeacher = cls.TeacherClassUserName;
            }
        })

        users?.map((user) => {
            if (user.UserName == idTeacher) {
                teacherClassName = user.Names;
            }
        })

        return teacherClassName;
    }
    const teacherName = getTeacherName();

    var studentID = "";
    function getStudentName() {
        let name = "";
        student.map((std) => {
            if (account.UserName == std.ParentUserName) {
                name = std.StudentName;
                studentID = std.StudentID
            }
        })
        return name;
    }
    const studentName = getStudentName();

    function getUserName() {
        permission?.map((per) => {
            student.map((std) => {
                if (per.StudentName == std.StudentName) {
                    per.ParentUserName = std.ParentUserName;
                }
            })
        })
        permission.map((per) => {
            users.map((user) => {
                if (user.UserName = per.ParentUserName) {
                    per.Names = user.Names;
                }
            })
        })
    }
    getUserName();

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log(form);
    }

    const handleSubmit = async () => {

        form.StudentID = studentID;
        const today = new Date();
        const time = today.getFullYear() + "-" + (today.getMonth() < 10 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate());
        // +" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
        // form.PermissionDay  = time;

        console.log(form);
        console.log(time);
        if (!form.PermissionDay) {
            alert("Thời gian đang trống")
            return;
        }
        if (form.PermissionDay < time) {
            alert("Không được nhập ngày cũ")
            return;
        }
        if (!form.PermissionContent) {
            alert("Nội dung đang trống")
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json ; charset=UTF-8' },
            body: JSON.stringify({ ...form })
        };
        fetch('http://127.0.0.1:8000/api/permission', requestOptions)
            .then((response) => {
                if (response.status == 200) {
                    console.log("Thành công\n" + form);
                    alertNav.success("Gửi thành công: ");
                } else {
                    console.log("Thất bại\n" + form);
                    alertNav.error("Gửi thất bại: ");
                }
            })
            .catch(error => {
                alertNav.error("Fetch thất bại: ");
                console.log('error', error)
            });

    }
    const styleDisplay = account?.Role == "Parent" ? "flex" : "grid";

    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="form-content" style={{ display: styleDisplay }}>
                    {account?.Role === "Parent" && (
                        <form id="form-input" action="POST">
                            <table style={{ width: "100%" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f2f6fc" }}>
                                        <h2
                                            style={{ paddingTop: "10px", paddingLeft: "10px" }}
                                        >Đơn xin nghĩ học</h2>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid #ccc" }}>
                                        <label
                                            style={{ height: "30px", marginTop: 10 }}
                                        >Người gửi : {account.Names} </label>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #ccc" }}>
                                        <label
                                            style={{ height: "30px", marginTop: 10 }}
                                        >Người nhận : {teacherName}</label>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #ccc" }}>
                                        <label
                                            style={{ height: "30px", marginTop: 10, marginRight: 10 }}
                                        >Ngày nghĩ : </label>
                                        <input
                                            style={{ width: "200px", height: 30, marginBottom: 10, fontSize: 16 }}
                                            type="date"
                                            name="PermissionDay"
                                            value={form.PermissionDay}
                                            onChange={handleOnChange}
                                        ></input>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #ccc" }}>
                                        <label
                                            for="textarea-form"
                                            style={{ height: "30px", marginTop: 10 }}
                                        >Nội dung :</label>
                                        <textarea id="textarea-form" cols="90" rows="10"
                                            type="text"
                                            name="PermissionContent"
                                            value={form.PermissionContent}
                                            onChange={handleOnChange}
                                            style={{ fontSize: 16, border: "none" }}
                                        ></textarea>
                                    </tr>
                                </tbody>
                                <tfoot></tfoot>
                            </table>
                            <button
                                type="button"
                                name="Gui"
                                className="btn btn-gui-form"
                                onClick={handleSubmit}
                            >Gửi</button>
                        </form>
                    )}
                    <ShowPermission permission={permission} studentName={studentName} account={account} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

const ShowPermission = memo((props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [permission, setPermission] = useState([]);
    const { Panel } = Collapse
    useLayoutEffect(() => {
        if (props.permission !== permission) {
            setPermission(props.permission)
            setIsLoading(props.isLoading)
        }
        console.log(isLoading);
    }, [props.permission])

    let account = props.account;
    const arrPerTeacher = permission.filter((per) => {
        return per.TeacherName == account.Names;
    })
    console.log(arrPerTeacher);

    const arrPerParent = permission.filter((per) => {
        return per.StudentName == props.studentName;
    })
    console.log(arrPerParent);

    const renderHeader = (time) => (
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <span>Đơn xin nghĩ học</span>
            <span>{time}</span>
        </div>
    );

    const widthBox = account?.Role == "Parent" ? "50%" : "100%";

    return (
        <>
            {account?.Role == "Parent" && (
                <div className="box-permission" style={{ width: widthBox, height: " 600px", marginLeft: " 10px", borderLeft: " 1px solid #ccc", paddingLeft: "10px", overflowY: "scroll" }}>
                    <h2>Đơn đã gửi</h2>
                    <hr />
                    <div>
                        <div className="ant-spin-loading">{isLoading && <Spin />}</div>
                    </div>
                    {
                        arrPerParent.map((per) => {
                            if (per.StudentName == props.studentName)
                                return (
                                    <div key={per.PermissionFormID} className="item-permission">
                                        <Collapse defaultActiveKey={['1']}>
                                            <Panel header={renderHeader(per?.PermissionDay)} key={per.PermissionFormID}>
                                                <p>Kính gửi giáo viên {per.TeacherName},</p>
                                                <p>Tôi là phụ huynh em : {per?.StudentName}</p>
                                                <p>Nội dung : {per?.PermissionContent}</p>
                                                <div className="footer-item-permission">
                                                    <h2>Chữ ký phụ huynh</h2>
                                                    <p>{per.Names}</p>
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                )
                        })
                    }
                    {arrPerParent.length == 0 && !isLoading && (<h3>Không có đơn nào được gửi đi</h3>)}
                </div>
            )}
            {account?.Role == "Teacher" && (
                <div className="box-permission">
                    <h2>Đơn được gửi tới</h2>
                    <hr />
                    <div>
                        <div className="ant-spin-loading">{isLoading && <Spin />}</div>
                    </div>
                    {
                        arrPerTeacher.map((per) => {
                            if (per.TeacherName == account.Names)
                                return (
                                    <div key={per.PermissionFormID} className="item-permission">
                                        <Collapse defaultActiveKey={['1']}>
                                            <Panel header={renderHeader(per?.PermissionDay)} key={per.PermissionFormID}>
                                                <p>Kính gửi giáo viên {per.TeacherName},</p>
                                                <p>Tôi là phụ huynh em : {per?.StudentName}</p>
                                                <p>Nội dung : {per?.PermissionContent}</p>
                                                <div className="footer-item-permission">
                                                    <h2>Chữ ký phụ huynh</h2>
                                                    <p>{per.Names}</p>
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                )
                        })
                    }
                    {arrPerTeacher.length == 0 && !isLoading && (<h3>Không có đơn nào được gửi tới</h3>)}
                </div>
            )}
        </>

    )
})

export default Form;


