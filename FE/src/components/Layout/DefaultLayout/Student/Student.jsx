import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../../../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
import _ from "lodash";
export default function Student() {
    const alert = useAlert();
    const [subjects, setSubJect] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [allPoint, setAllPoint] = useState([]);
    const [point, setPoint] = useState({
        Final: "",
        Midterm: "",
        Quiz1: "",
        Oral_1: "",
        SubjectID: "",
    });
    const id = parseInt(useParams().id);
    const getAllPoint = async () => {
        const result = await axios.get("http://127.0.0.1:8000/api/Points");
        const pointList = await result.data;
        return pointList;
    };

    const handleSubject = async () => {
        const subjectList = JSON.parse(localStorage.getItem("subjects"));
        const pointList = await getAllPoint();
        const findPointById = pointList.filter(
            (p) => p.StudentID === parseInt(id)
        );
        const newSubject = [];
        subjectList.forEach((sub) => {
            if (newSubject.length == 0) {
                newSubject.push(sub);
            } else {
                const check = newSubject.some(
                    (s) => s.SubjectName == sub?.SubjectName
                );
                if (!check) {
                    newSubject.push(sub);
                }
            }
        });
        const result = newSubject.reduce((prevState, currentState, index) => {
            const findMachSubjectAndPoint = findPointById.filter((point) => {
                if (point?.SubjectID === currentState?.SubjectID) {
                    return point;
                } else {
                    return false;
                }
            });
            currentState.points = findMachSubjectAndPoint;
            prevState.push(currentState);
            return prevState;
        }, []);
        setSubJect([...result]);
    };
    useEffect(async () => {
        handleSubject();
    }, []);

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name !== "SubjectID") {
            if (value < 0) {
                setPoint((prevStte) => {
                    return {
                        ...prevStte,
                        [name]: "",
                    };
                });
                return alert.error(" Điểm phải lớn hơn 0");
            } else if (value > 10) {
                setPoint((prevStte) => {
                    return {
                        ...prevStte,
                        [name]: "",
                    };
                });
                return alert.error(" Điểm phải nhỏ hơn 10");
            }
        }

        setPoint((prevState) => {
            return {
                ...prevState,
                [name]: parseFloat(value),
            };
        });
    };
    const handleSubmit = async () => {
        try {
            const obj = {
                ...point,
                StudentID: id,
                Oral_2: 6.5,
                Oral_3: 8,
                Quiz2: 0,
                Quiz3: 0,
            };
            const result = await axios.post(
                "http://127.0.0.1:8000/api/Point",
                obj
            );
            const r1 = result.data;
            alert.success("Create Point Successfully: ");
            handleSubject();
        } catch (error) {
            alert.error("Create Point Error: ");
        }
        // .then(() => {
        // })
        // .catch(() => {
        //     alert.error("Create Point Error: ");
        // });
    };
    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="grade">
                <div className="annouce" style={{ marginTop: "30px" }}>
                    <span>
                        <i className="bx bxs-notepad" />
                        BẢNG ĐIỂM
                    </span>
                </div>
                <div
                    className="grade-table"
                    style={{ fontSize: "16px", margin: 10 }}
                >
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        style={{
                            fontSize: 15,
                            fontWeight: "600",
                            marginBottom: 50,
                        }}
                    >
                        Nhập điểm
                    </button>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <form action="" method="POST" role="form">
                                        <legend>Bảng nhập điểm</legend>

                                        <div className="form-group">
                                            <label htmlFor="">Điểm miệng</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="Oral_1"
                                                placeholder="Nhập điểm miệng"
                                                value={point.Oral_1}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Điểm 15 phút
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="Quiz1"
                                                placeholder="Nhập điểm 15 phút"
                                                value={point.Quiz1}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Giữa kì</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="Midterm"
                                                placeholder="Nhập điểm giữa kì"
                                                value={point.Midterm}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Cuối kì</label>
                                            <input
                                                name="Final"
                                                type="number"
                                                className="form-control"
                                                id=""
                                                placeholder="Nhập điểm cuối kì"
                                                onChange={handleOnChange}
                                                value={point.Final}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <select
                                                id="input"
                                                className="form-control"
                                                required="required"
                                                name="SubjectID"
                                                onChange={handleOnChange}
                                            >
                                                {subjects.map((subject) => {
                                                    return (
                                                        <option
                                                            value={
                                                                subject?.SubjectID
                                                            }
                                                        >
                                                            {
                                                                subject?.SubjectName
                                                            }
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        style={{ fontSize: 14 }}
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        style={{ fontSize: 14 }}
                                        onClick={handleSubmit}
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Tạo bảng điểm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered table-striped table-hover p-5">
                        <thead>
                            <tr>
                                <th>Môn</th>
                                <th colSpan="3">Điểm miệng</th>
                                <th colSpan="3">Kiểm tra 15 phút</th>
                                <th>Giữa kì</th>
                                <th>Cuối kì</th>
                                <th>Trung bình môn</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => {
                                return (
                                    <tr>
                                        <th scope="row">
                                            {subject?.SubjectName}
                                        </th>
                                        {subject?.points?.map((p) => {
                                            return (
                                                <>
                                                    <td>{p?.Quiz1}</td>
                                                    <td>{p?.Quiz2}</td>
                                                    <td>{p?.Quiz3}</td>
                                                    <td>{p?.Oral_1}</td>
                                                    <td>{p?.Oral_2}</td>
                                                    <td>{p?.Oral_3}</td>
                                                    <td>{p?.Midterm}</td>

                                                    <td>{p?.Final}</td>
                                                    <td>10</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-success"
                                                        >
                                                            UPDATE
                                                        </button>{" "}
                                                    </td>
                                                </>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
