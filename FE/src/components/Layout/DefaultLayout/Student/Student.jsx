import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../../../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
import _, { isNumber } from "lodash";
import { Spin } from "antd";
export default function Student(props) {
    const alert = useAlert();

    const [subjects, setSubJect] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [allPoint, setAllPoint] = useState([]);
    const [point, setPoint] = useState({
        Final: "",
        Midterm: "",
        Quiz1: "",
        Quiz2: "",
        Quiz3: "",
        Oral_1: "",
        Oral_2: "",
        Oral_3: "",
    });
    const account = JSON.parse(localStorage.getItem("account"));
    const id = parseInt(useParams().id);
    const getAllPoint = async () => {
        const result = await axios.get("http://127.0.0.1:8000/api/Point/all");
        const pointList = await result.data;
        return pointList;
    };
    const clearState = () => {
        setPoint({
            Final: "",
            Midterm: "",
            Quiz1: "",
            Quiz2: "",
            Quiz3: "",
            Oral_1: "",
            Oral_2: "",
            Oral_3: "",
        });
    };
    const handleSubject = async () => {
        var subjectList = JSON.parse(localStorage.getItem("subjects"));
        console.log(subjectList);
        let findSubjectByUserName = [];
        if (props.role === "teacher") {
            findSubjectByUserName = subjectList.filter(
                (sub) => sub?.TeacherSubjectUserName == account?.UserName
            );
        } else {
            findSubjectByUserName = subjectList;
        }
        const pointList = await getAllPoint();
        const findPointById = pointList.filter(
            (p) => p.StudentID === parseInt(id)
        );
        const newSubject = [];
        findSubjectByUserName.forEach((sub) => {
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
        const result = newSubject.reduce((prevState, currentState) => {
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
    useEffect(() => {
        handleSubject();
    }, []);
    console.log(subjects);
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
                return alert.error(" ??i???m ph???i l???n h??n 0");
            } else if (value > 10) {
                setPoint((prevStte) => {
                    return {
                        ...prevStte,
                        [name]: "",
                    };
                });
                return alert.error(" ??i???m ph???i nh??? h??n 10");
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
            if (!isUpdate) {
                const obj = {
                    ...point,
                    StudentID: id,
                    SubjectID: subjects[0]?.SubjectID,
                };
                await axios.post("http://127.0.0.1:8000/api/Point", obj);

                console.log(obj);
                alert.success("T???o b???ng ??i???m th??nh c??ng: ");
                handleSubject();
                clearState();
            } else {
                await axios.put(
                    `http://127.0.0.1:8000/api/Point/${id}-${subjects[0]?.SubjectID}`,
                    { ...point }
                );

                alert.success("C???p nh???t ??i???m th??nh c??ng: ");
                handleSubject();
                clearState();
                setIsUpdate(false);
            }
        } catch (error) {
            alert.error("T???o b???ng ??i???m th???t b???i: ");
        }
    };
    const handleUpdate = (point) => {
        setPoint({
            Final: point?.Final,
            Midterm: point?.Midterm,
            Quiz1: point?.Quiz1,
            Quiz2: point?.Quiz2,
            Quiz3: point?.Quiz3,
            Oral_1: point?.Oral_1,
            Oral_2: point?.Oral_2,
            Oral_3: point?.Oral_3,
        });
        setIsUpdate(true);
    };
    const showScore = (point) => {
        if (
            (point?.Quiz1,
            isNumber(point?.Quiz2),
            isNumber(point?.Quiz3),
            isNumber(point?.Oral_1),
            isNumber(point?.Oral_2),
            isNumber(point?.Oral_3),
            isNumber(point?.Midterm),
            isNumber(point?.Final))
        ) {
            return (
                (point?.Quiz1 +
                    point?.Quiz2 +
                    point?.Quiz3 +
                    point?.Oral_1 +
                    point?.Oral_2 +
                    point?.Oral_3 +
                    point?.Midterm * 2 +
                    point?.Final * 3) /
                11
            ).toFixed(2);
        }
    };
    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="grade" style={{ height: "1440px" }}>
                <div
                    className="annouce"
                    style={{ marginTop: "30px", marginBottom: "50px" }}
                >
                    <span>
                        <i className="bx bxs-notepad" />
                        B???NG ??I???M
                    </span>
                </div>
                <div className="grade-table" style={{ margin: 10 }}>
                    {account?.Role === "Teacher" && (
                        <>
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
                                Nh???p ??i???m
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
                                            <form
                                                action=""
                                                method="POST"
                                                role="form"
                                            >
                                                <legend>B???ng nh???p ??i???m</legend>

                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        ??i???m mi???ng L???n 1
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Quiz1"
                                                        placeholder="Nh???p ??i???m mi???ng"
                                                        value={point.Quiz1}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        ??i???m mi???ng L???n 2
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Quiz2"
                                                        placeholder="Nh???p ??i???m mi???ng"
                                                        value={point.Quiz2}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        ??i???m mi???ng L???n 3
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Quiz3"
                                                        placeholder="Nh???p ??i???m mi???ng"
                                                        value={point.Quiz3}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        ??i???m 15 ph??t L???n 1
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Oral_1"
                                                        placeholder="Nh???p ??i???m 15 ph??t"
                                                        value={point.Oral_1}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        ??i???m 15 ph??t L???n 2
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Oral_2"
                                                        placeholder="Nh???p ??i???m 15 ph??t"
                                                        value={point.Oral_2}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        ??i???m 15 ph??t L???n 3
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Oral_3"
                                                        placeholder="Nh???p ??i???m 15 ph??t"
                                                        value={point.Oral_3}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Gi???a k??
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Midterm"
                                                        placeholder="Nh???p ??i???m gi???a k??"
                                                        value={point.Midterm}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Cu???i k??
                                                    </label>
                                                    <input
                                                        name="Final"
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        placeholder="Nh???p ??i???m cu???i k??"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                        value={point.Final}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                style={{ fontSize: 14 }}
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                                onClick={() =>
                                                    setIsUpdate(false)
                                                }
                                            >
                                                ????ng
                                            </button>
                                            <button
                                                style={{ fontSize: 14 }}
                                                onClick={handleSubmit}
                                                type="button"
                                                className={
                                                    isUpdate
                                                        ? "btn btn-success"
                                                        : "btn btn-primary"
                                                }
                                            >
                                                {isUpdate
                                                    ? "Update B???ng ??i???m"
                                                    : "T???o b???ng ??i???m"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <table className="table table-bordered table-striped table-hover p-5">
                        <thead style={{ backgroundColor: "#707070" }}>
                            <tr style={{ textAlign: "center" }}>
                                <th>M??n</th>
                                <th colSpan="3">??i???m mi???ng</th>
                                <th colSpan="3">Ki???m tra 15 ph??t</th>
                                <th>Gi???a k??</th>
                                <th>Cu???i k??</th>
                                <th style={{ whiteSpace: "nowrap" }}>
                                    Trung b??nh m??n
                                </th>
                                {account?.Role === "Teacher" && (
                                    <th>H??nh ?????ng</th>
                                )}
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {subjects?.length == 0 ? (
                                <tr
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Spin />
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ) : (
                                subjects.map((subject) => {
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
                                                        <td
                                                            style={{
                                                                width: "150px",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {showScore(p)}
                                                        </td>
                                                        {account?.Role ===
                                                            "Teacher" && (
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                    data-toggle="modal"
                                                                    data-target="#exampleModal"
                                                                    onClick={() =>
                                                                        handleUpdate(
                                                                            p
                                                                        )
                                                                    }
                                                                >
                                                                    UPDATE
                                                                </button>
                                                            </td>
                                                        )}
                                                    </>
                                                );
                                            })}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
