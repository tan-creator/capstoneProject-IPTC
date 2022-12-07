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
                return alert.error(name + " Is Must be greater than 0");
            } else if (value > 10) {
                setPoint((prevStte) => {
                    return {
                        ...prevStte,
                        [name]: "",
                    };
                });
                return alert.error(name + " Is Must be smaller than 10");
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
                    style={{ padding: "30px", fontSize: "15px" }}
                >
                    <button
                        type="button"
                        class="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleModal"
                    >
                        Create
                    </button>
                    <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <form action="" method="POST" role="form">
                                        <legend>Form title</legend>

                                        <div class="form-group">
                                            <label for="">Final</label>
                                            <input
                                                name="Final"
                                                type="number"
                                                class="form-control"
                                                id=""
                                                placeholder="Input Final"
                                                onChange={handleOnChange}
                                                value={point.Final}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="">Midterm</label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                name="Midterm"
                                                placeholder="Input Midterm"
                                                value={point.Midterm}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="">Oral_1</label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                name="Oral_1"
                                                placeholder="Input Oral_1"
                                                value={point.Oral_1}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="">Quiz1</label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                name="Quiz1"
                                                placeholder="Input Quiz1"
                                                value={point.Quiz1}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <select
                                                id="input"
                                                class="form-control"
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
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Create Point
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered table-hover p-5">
                        <thead>
                            <tr>
                                <th>MON</th>
                                <th>Final</th>
                                <th>Midterm</th>
                                <th>Oral_1</th>
                                <th>Oral_2</th>
                                <th>Oral_3</th>
                                <th>Quiz1</th>
                                <th>Quiz2</th>
                                <th>Quiz3</th>
                                <th>TBM</th>
                                <th>ACTIONS</th>
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
                                                    <td>{p?.Final}</td>
                                                    <td>{p?.Midterm}</td>
                                                    <td>{p?.Oral_1}</td>
                                                    <td>{p?.Oral_2}</td>
                                                    <td>{p?.Oral_3}</td>
                                                    <td>{p?.Quiz1}</td>
                                                    <td>{p?.Quiz2}</td>
                                                    <td>{p?.Quiz3}</td>
                                                    <td>10</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            class="btn btn-success"
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
