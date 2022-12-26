import React, { useEffect, useState, useLayoutEffect, memo } from "react";
import { useAlert } from "react-alert";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import "./form.css"

function Form () {
    const [classes, setClass] = useState([]);
    const [users, setUser] = useState([])

    const [account, setAccount] = useState({})
    const [student, setStudent] = useState([])
    const [permission, setPermission] = useState([])
    const alertNav = useAlert();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/student")
            .then (response => response.json())
            .then(json => {
                setStudent(json)
            })
            .catch(error => console.log('error',error));

        fetch("http://127.0.0.1:8000/api/class")
            .then (response => response.json())
            .then(json => {
                setClass(json)
            })
            .catch(error => console.log('error',error));

        fetch("http://127.0.0.1:8000/api/user")
            .then (response => response.json())
            .then(json => {
                setUser(json)
            })
            .catch(error => console.log('error',error));

        const users = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...users})
        console.log("Thong tin account\n" + account);

        fetch("http://127.0.0.1:8000/api/permission")
            .then (response =>  response.json())
            .then(json => {
                setPermission(json)
                console.log(permission);
            })
            .catch(error => console.log('error',error));
    },[]);

    const [form, setForm] = useState({
        StudentID : "",
        PermissionDay : "",
        PermissionContent: ""
    })

    function getTeacherName() {
        let idClass = "";
        let idTeacher = "";
        let teacherClassName = ""
        student.map((std) => {
            if(account.UserName == std.ParentUserName) {
                idClass = std.ClassID;
            }
        })

        classes.map((cls) => {
            if(cls.ClassID == idClass) {
                idTeacher = cls.TeacherClassUserName;
            }
        })

        users.map((user) => {
            if(user.UserName == idTeacher) {
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
            if(account.UserName == std.ParentUserName) {
                name = std.StudentName;
                studentID = std.StudentID
            }
        })
        return name;
    }
    const studentName = getStudentName();

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
        const time = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        // +" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
        form.PermissionDay  = time;

        console.log(form);

        if (!form.PermissionContent) {
            alert("Nội dung đang trống")
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json ; charset=UTF-8' },
            body: JSON.stringify({...form})
        };
        fetch('http://127.0.0.1:8000/api/permission', requestOptions)
            .then((response)  => {
                if (response.status == 200) {
                    console.log("Thành công\n"+form);
                    alertNav.success("Gửi thành công: ");
                } else {
                    console.log("Thất bại\n"+form);
                    alertNav.error("Gửi thất bại: ");
                }
            })
            .catch(error => {
                alertNav.error("Fetch thất bại: ");
                console.log('error',error)
            });

    }
    const styleDisplay = account?.Role == "Parent" ? "flex" : "grid";

    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="form-content" style={{display:styleDisplay}}>
                    {account?.Role === "Parent" && (
                        <form action="POST">
                            <table>
                                <thead>
                                    <tr>
                                        <h2>Đơn xin nghĩ học</h2>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <label htmlFor="">Người gửi: {account.Names} </label>
                                    </tr>
                                    <tr>
                                        <label htmlFor="">Người nhận: {teacherName}</label>
                                    </tr>
                                    <tr>
                                        <label htmlFor="">Nội dung:</label>
                                        <textarea id="" cols="90" rows="20"
                                            type="text"
                                            name="PermissionContent"
                                            value={form.PermissionContent}
                                            onChange={handleOnChange}
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
                    <ShowPermission permission={permission} studentName={studentName} account={account}/>
                </div>
            </div>
        </div>
    )
}

const ShowPermission = memo( (props) => {
    const [permission, setPermission] = useState([]);
    useLayoutEffect(() => {
        if (props.permission !== permission) {
            setPermission(props.permission)
        }
    }, [props.permission])
    console.log(permission);

    let account = props.account;
    return (
        <>
            {account?.Role == "Parent" && (
                <div className="box-permission" style={{height:" 600px",marginLeft:" 10px",borderLeft:" 1px solid #ccc",paddingLeft: "10px",overflowY: "scroll"}}>
                    <h2>Đơn đã gửi</h2>
                    <hr />
                    {
                        permission.map((per) => {
                            if (per.StudentName == props.studentName)
                            return (
                                <div key={per.PermissionFormID} className="item-permission">
                                    <div className="head-item-permission">
                                        <h3>Đơn xin nghĩ học</h3>
                                        <h3>Thời gian : {per?.PermissionDay}</h3>
                                    </div>
                                    <p>Kính gửi cô/thầy,</p>
                                    <p>Tôi là : {account.Names} </p>
                                    <p>Phụ huynh em : {per?.StudentName}</p>
                                    <p>Nội dung : {per?.PermissionContent}</p>
                                    <div className="footer-item-permission">
                                        <h3>Chữ ký phụ huynh</h3>
                                        <p>{account.Names}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            {account?.Role == "Teacher" && (
                <div className="box-permission">
                    <h2>Đơn được gửi tới</h2>
                    <hr />
                    {
                        permission.map((per) => {
                            if (per.TeacherName == account.Names)
                            return (
                                <div key={per.PermissionFormID} className="item-permission">
                                    <div className="head-item-permission">
                                        <h3>Đơn xin nghĩ học</h3>
                                        <h3>Thời gian : {per?.PermissionDay}</h3>
                                    </div>
                                    <p>Kính gửi cô/thầy,</p>
                                    <p>Tôi là : {account.Names} </p>
                                    <p>Phụ huynh em : {per?.StudentName}</p>
                                    <p>Nội dung : {per?.PermissionContent}</p>
                                    <div className="footer-item-permission">
                                        <h3>Chữ ký phụ huynh</h3>
                                        <p>{account.Names}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </>

    )
})

export default Form;
