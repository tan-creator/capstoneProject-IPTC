import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import axios from "axios";
import { getStudent } from "../../helpers/getUser";
import { getSubject } from "../../helpers/getUser";
import "./schedule.css"

function Shedule () {
    const [subject, setSubject] = useState([]);
    const [user, setUser] = useState([]);
    const [classes, setClass] = useState([]);
    const [student, setStudent] = useState([])

    useEffect(() => {

        const subjects = JSON.parse(localStorage.getItem("subjects"));
        setSubject(subjects)

        const users = JSON.parse(localStorage.getItem("account"));
        setUser(users)

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

    }, []);

    function getSubject () {
        const arrLichHoc = [];
        var idCl = "";

        if (user.Role == "Teacher") {
            subject.map((sub) => {
                if (sub.TeacherSubjectUserName === user.UserName) {
                    arrLichHoc.push(sub);
                }
            })
            arrLichHoc.map((arr) => {
                classes.map((cls) => {
                    if (arr.ClassID === cls.ClassID) {
                        arr.ClassName = cls.ClassName;
                    }
                })
            })
        }

        if (user.Role == "Parent") {
            student.map((std) => {
                if (user.UserName === std.ParentUserName) {
                    idCl = std.ClassID
                }
            })
            subject.map((sub) => {
                if(sub.ClassID == idCl) {
                    arrLichHoc.push(sub);
                }
            })
        }
        return arrLichHoc
    }

    const arrT2 = [{},{},{},{},{},{},{},{},{},{}]
    const arrT3 = [{},{},{},{},{},{},{},{},{},{}]
    const arrT4 = [{},{},{},{},{},{},{},{},{},{}]
    const arrT5 = [{},{},{},{},{},{},{},{},{},{}]
    const arrT6 = [{},{},{},{},{},{},{},{},{},{}]
    const arrT7 = [{},{},{},{},{},{},{},{},{},{}]
    const arrCN = [{},{},{},{},{},{},{},{},{},{}]

    function getLich (array,str) {
        getSubject().map((arr) => {
            if (arr.DateOfWeek == str) {
                if (arr.SubjectTime == "7:00-7:45" ) {
                    array[0] = arr;
                }
                if (arr.SubjectTime == "7:50-8:35" ) {
                    array[1] = arr;
                }
                if (arr.SubjectTime == "8:40-9:25" ) {
                    array[2] = arr;
                }
                if (arr.SubjectTime == "9:40-10:25" ) {
                    array[3] = arr;
                }
                if (arr.SubjectTime == "10:30-11:15" ) {
                    array[4] = arr;
                }
                if (arr.SubjectTime == "13:00-13:45" ) {
                    array[5] = arr;
                }
                if (arr.SubjectTime == "13:50-14:35" ) {
                    array[6] = arr;
                }
                if (arr.SubjectTime == "14:40-15:25"  ) {
                    array[7] = arr;
                }
                if (arr.SubjectTime ==  "15:40-16:25" ) {
                    array[8] = arr;
                }
                if (arr.SubjectTime ==  "16:30-17:15" ) {
                    array[9] = arr;
                }
            }
        })
        return array;
    }

    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="Schedule">
                    <div className="schedule-content">
                        <div className="info-user">
                            <p>Ten: {user.Names}</p>
                        </div>
                        <div className="info-year">
                            <p>Nam hoc:</p>
                        </div>
                        <div className="schedule-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>thu 2</th>
                                        <th>thu 3</th>
                                        <th>thu 4</th>
                                        <th>thu 5</th>
                                        <th>thu 6</th>
                                        <th>thu 7</th>
                                        <th>chu nhat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <tr><div className="hour">7:00 - 7:45</div></tr>
                                            <tr><div className="hour">7:50 - 8:35</div></tr>
                                            <tr><div className="hour">8:40 - 9:25</div></tr>
                                            <tr><div className="hour">9:40 - 10:25</div></tr>
                                            <tr><div className="hour">10:30 - 11:15</div></tr>
                                            <tr><div className="hour">13:00 - 13:45</div></tr>
                                            <tr><div className="hour">13:50 - 14:35</div></tr>
                                            <tr><div className="hour">14:40 - 15:25</div></tr>
                                            <tr><div className="hour">15:40 - 16:25</div></tr>
                                            <tr><div className="hour">16:30 - 17:15</div></tr>
                                        </td>
                                        <td>
                                            {getLich(arrT2,"Thứ 2").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                            <tr></tr>
                                        </td>
                                        <td>
                                            {getLich(arrT3,"Thứ 3").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            {getLich(arrT4,"Thứ 4").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            {getLich(arrT5,"Thứ 5").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            {getLich(arrT6,"Thứ 6").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            {getLich(arrT7,"Thứ 7").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            {getLich(arrCN,"Chủ Nhật").map((data) => {
                                                const color = data.SubjectTime ? "#f48023" : "#fff"
                                                return (
                                                    <tr >
                                                        <div className="box-schedule" style={{backgroundColor:color}}>
                                                            <p>{data?.SubjectName}</p>
                                                            <p>{data?.ClassName}</p>
                                                        </div>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shedule;
