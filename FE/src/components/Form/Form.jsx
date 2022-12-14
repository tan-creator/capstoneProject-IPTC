import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import "./form.css"

function Form () {
    const [classes, setClass] = useState([]);
    const [account, setAccount] = useState({})
    const [student, setStudent] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/class")
            .then (response => response.json())
            .then(json => {
                setClass(json)
            })
            .catch(error => console.log('error',error));

        fetch("http://127.0.0.1:8000/api/student")
            .then (response => response.json())
            .then(json => {
                setStudent(json)
            })
            .catch(error => console.log('error',error));

        fetch("http://127.0.0.1:8000/api/user")
            .then (response => response.json())
            .then(json => {
                setUsers(json)
            })
            .catch(error => console.log('error',error));

        const users = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...users})

    }, []);

    function getNameTeacher() {
        const idCl = 0;
        const idTeacher = 0;
        const name = "";

        student.map((std) => {
            if(account.UserName === std.ParentUserName) {
                idCl = std.ClassID;
            }
        })

        classes.map((cls) => {
            if(idCl == cls.ClassID){
                idTeacher = cls.TeacherClassUserName;
            }
        })

        users.map((user) => {
            if(idTeacher == user.UserName){
                name = user.Names;
            }
        })

        return name;
    }
    // var nameTeacher = getNameTeacher();

    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="form-content">
                    <form action="">
                        <table>
                            <tr>
                                <td colSpan={2}><h2>Đơn xin nghĩ học</h2></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><label htmlFor="">Người gửi: {account.Names} </label></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><label htmlFor="">Người nhận: </label></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="title">Title</label></td>
                                <td><input type="text" name="title" id="title" /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><textarea name="" id="" cols="30" rows="4"></textarea></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
