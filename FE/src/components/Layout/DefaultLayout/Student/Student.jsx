import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../../../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
import _ from "lodash";
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
            if (!isUpdate) {
                const obj = {
                    ...point,
                    StudentID: id,
                    SubjectID: subjects[0]?.SubjectID,
                };
                await axios.post("http://127.0.0.1:8000/api/Point", obj);

                console.log(obj);
                alert.success("Create Point Successfully: ");
                handleSubject();
                clearState();
            } else {
                await axios.put(
                    `http://127.0.0.1:8000/api/Point/${id}-${subjects[0]?.SubjectID}`,
                    { ...point }
                );

                alert.success("Update Point Successfully: ");
                handleSubject();
                clearState();
                setIsUpdate(false);
            }
        } catch (error) {
            alert.error("Create Point Error: ");
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
    console.log(subjects);
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
                        BẢNG ĐIỂM
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
                                            <form
                                                action=""
                                                method="POST"
                                                role="form"
                                            >
                                                <legend>Bảng nhập điểm</legend>

                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Điểm miệng Lần 1
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Quiz1"
                                                        placeholder="Nhập điểm miệng"
                                                        value={point.Quiz1}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Điểm miệng Lần 2
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Quiz2"
                                                        placeholder="Nhập điểm miệng"
                                                        value={point.Quiz2}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Điểm miệng Lần 3
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Quiz3"
                                                        placeholder="Nhập điểm miệng"
                                                        value={point.Quiz3}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Điểm 15 phút Lần 1
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Oral_1"
                                                        placeholder="Nhập điểm 15 phút"
                                                        value={point.Oral_1}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Điểm 15 phút Lần 2
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Oral_2"
                                                        placeholder="Nhập điểm 15 phút"
                                                        value={point.Oral_2}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Điểm 15 phút Lần 3
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Oral_3"
                                                        placeholder="Nhập điểm 15 phút"
                                                        value={point.Oral_3}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Giữa kì
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Midterm"
                                                        placeholder="Nhập điểm giữa kì"
                                                        value={point.Midterm}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Cuối kì
                                                    </label>
                                                    <input
                                                        name="Final"
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        placeholder="Nhập điểm cuối kì"
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
                                                Đóng
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
                                                    ? "Update Bảng Điểm"
                                                    : "Tạo bảng điểm"}
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
                                <th>Môn</th>
                                <th colSpan="3">Điểm miệng</th>
                                <th colSpan="3">Kiểm tra 15 phút</th>
                                <th>Giữa kì</th>
                                <th>Cuối kì</th>
                                <th style={{ whiteSpace: "nowrap" }}>
                                    Trung bình môn
                                </th>
                                {account?.Role === "Teacher" && (
                                    <th>Hành động</th>
                                )}
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
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
                                                    <td
                                                        style={{
                                                            width: "150px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {(p?.Quiz1 +
                                                            p?.Quiz2 +
                                                            p?.Quiz3 +
                                                            p?.Oral_1 +
                                                            p?.Oral_2 +
                                                            p?.Oral_3 +
                                                            p?.Midterm +
                                                            p?.Final) /
                                                            8}
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
