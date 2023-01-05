import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import { Spin } from "antd";

import "./schedule.css";

function Shedule() {
    const [subject, setSubject] = useState([]);
    const [user, setUser] = useState([]);
    const [classes, setClass] = useState([]);
    const [student, setStudent] = useState([]);
    const [persons, setPerson] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("account"));
        setUser(users);

        fetch("http://127.0.0.1:8000/api/user")
            .then((response) => response.json())
            .then((json) => {
                setPerson(json);
            })
            .catch((error) => console.log("error", error));

        fetch("http://127.0.0.1:8000/api/subject")
            .then((response) => response.json())
            .then((json) => {
                setSubject(json);
            })
            .catch((error) => console.log("error", error));

        fetch("http://127.0.0.1:8000/api/class")
            .then((response) => response.json())
            .then((json) => {
                setClass(json);
            })
            .catch((error) => console.log("error", error));

        fetch("http://127.0.0.1:8000/api/student")
            .then((response) => response.json())
            .then((json) => {
                setStudent(json);
            })
            .catch((error) => console.log("error", error));
    }, []);

    function getSubject() {
        const arrLichHoc = [];
        var idCl = "";

        if (user.Role == "Teacher") {
            subject.map((sub) => {
                if (sub.TeacherSubjectUserName === user.UserName) {
                    arrLichHoc.push(sub);
                }
            });
            arrLichHoc.map((arr) => {
                classes.map((cls) => {
                    if (arr.ClassID === cls.ClassID) {
                        arr.ClassName = cls.ClassName;
                    }
                });
            });
        }

        if (user.Role == "Parent") {
            student.map((std) => {
                if (user.UserName === std.ParentUserName) {
                    idCl = std.ClassID;
                }
            });
            subject.map((sub) => {
                if (sub.ClassID == idCl) {
                    arrLichHoc.push(sub);
                }
            });
            persons.map((person) => {
                arrLichHoc.map((arr) => {
                    if (person.UserName == arr.TeacherSubjectUserName) {
                        arr.Names = person.Names;
                    }
                });
            });
        }
        console.log("Lich hoc:\n" + arrLichHoc);
        return arrLichHoc;
    }

    const listLichHoc = [];
    getSubject().map((obj) => {
        const time = [];
        const date = [];
        time.push(...obj.SubjectTime.split(" "));
        date.push(...obj.DateOfWeek.split(" "));
        for (var i = 0; i < time.length; i++) {
            listLichHoc.push({
                time: time[i],
                date: date[i],
                ClassName: obj.ClassName,
                Names: obj.Names,
                SubjectName: obj.SubjectName,
            });
        }
    });

    const arrT2 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const arrT3 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const arrT4 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const arrT5 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const arrT6 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const arrT7 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const arrCN = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    function getLich(array, str) {
        listLichHoc.map((arr) => {
            if (arr.time == "7:00-7:45") {
                if (arr.date == str) {
                    array[0] = arr;
                }
            }
            if (arr.time == "7:50-8:35") {
                if (arr.date == str) {
                    array[1] = arr;
                }
            }
            if (arr.time == "8:40-9:25") {
                if (arr.date == str) {
                    array[2] = arr;
                }
            }
            if (arr.time == "9:40-10:25") {
                if (arr.date == str) {
                    array[3] = arr;
                }
            }
            if (arr.time == "10:30-11:15") {
                if (arr.date == str) {
                    array[4] = arr;
                }
            }
            if (arr.time == "13:00-13:45") {
                if (arr.date == str) {
                    array[5] = arr;
                }
            }
            if (arr.time == "13:50-14:35") {
                if (arr.date == str) {
                    array[6] = arr;
                }
            }
            if (arr.time == "14:40-15:25") {
                if (arr.date == str) {
                    array[7] = arr;
                }
            }
            if (arr.time == "15:40-16:25") {
                if (arr.date == str) {
                    array[8] = arr;
                }
            }
            if (arr.time == "16:30-17:15") {
                if (arr.date == str) {
                    array[9] = arr;
                }
            }
        });
        console.log(array);
        return array;
    }

    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="Schedule">
                    <div className="schedule-content">
                        <div className="annouce" style={{ paddingTop: 10 }}>
                            {user.Role == "Parent" && (
                                <span>
                                    <i className="bx bxs-notepad" />
                                    LỊCH HỌC
                                </span>
                            )}
                            {user.Role == "Teacher" && (
                                <span>
                                    <i className="bx bxs-notepad" />
                                    LỊCH DẠY
                                </span>
                            )}
                        </div>
                        <div className="info-user">
                            <p>
                                <strong>Tên :</strong> {user.Names}
                            </p>
                        </div>
                        <div className="info-year">
                            <p>
                                <strong>Năm học: </strong>2022-2023
                            </p>
                        </div>
                        {listLichHoc.length == 0 ? (
                            <Spin />
                        ) : (
                            <div className="schedule-box">
                                <table>
                                    <thead>
                                        <tr style={{ textAlign: "center" }}>
                                            <th></th>
                                            <th>Thứ 2</th>
                                            <th>Thứ 3</th>
                                            <th>Thứ 4</th>
                                            <th>Thứ 5</th>
                                            <th>Thứ 6</th>
                                            <th>Thứ 7</th>
                                            <th>Chủ nhật</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>7:00 - 7:45</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>7:50 - 8:35</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>8:40 - 9:25</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>9:40 - 10:25</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>10:30 - 11:15</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>13:00 - 13:45</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>13:50 - 14:35</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>14:40 - 15:25</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>15:40 - 16:25</p>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <div className="box-schedule hour">
                                                        <p>16:30 - 17:15</p>
                                                    </div>
                                                </tr>
                                            </td>
                                            <td>
                                                {getLich(arrT2, "2").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.SubjectName
                                                                        }{" "}
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.ClassName
                                                                        }{" "}
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                                <tr></tr>
                                            </td>
                                            <td>
                                                {getLich(arrT3, "3").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {
                                                                            data?.SubjectName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            data?.ClassName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                {getLich(arrT4, "4").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {
                                                                            data?.SubjectName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            data?.ClassName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                {getLich(arrT5, "5").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {
                                                                            data?.SubjectName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            data?.ClassName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                {getLich(arrT6, "6").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {
                                                                            data?.SubjectName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            data?.ClassName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                {getLich(arrT7, "7").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {
                                                                            data?.SubjectName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            data?.ClassName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                {getLich(arrCN, "8").map(
                                                    (data) => {
                                                        const color = data.time
                                                            ? "#f48023"
                                                            : "#fff";
                                                        return (
                                                            <tr>
                                                                <div
                                                                    className="box-schedule"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                >
                                                                    <p>
                                                                        {
                                                                            data?.SubjectName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            data?.ClassName
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {" "}
                                                                        {
                                                                            data?.Names
                                                                        }{" "}
                                                                    </p>
                                                                </div>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shedule;
