import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import { useAlert } from "react-alert";
import "./cost.css"

function Cost () {
    const [classes, setClass] = useState([]);
    const [costs, setCosts] = useState([])
    const [user, setUser] = useState({})
    const [student, setStudent] = useState([])
    const [bill, setBill] = useState({
        CostID: "",
        ClassID: "",
        CostType: "",
        CostAmountMoney: "",
        CostDescription: "",
    });
    const alertNav = useAlert();

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/cost")
            .then (response => response.json())
            .then(json => {
                setCosts(json)
            })
            .catch(error => console.log('error',error));

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

        const users = JSON.parse(localStorage.getItem("account"));
        setUser({ ...users})

    }, []);

    function getCost () {
        const arrCost = [];
        var idCl = "";

        if (user.Role == "Teacher") {
            classes.map((cls) => {
                if (user.UserName === cls.TeacherClassUserName) { idCl = cls.ClassID }
            })
            costs.map((cost) => {
                if(cost.ClassID == idCl) { arrCost.push(cost) }
            })
        }

        if (user.Role == "Parent") {
            student.map((std) => {
                if (user.UserName === std.ParentUserName) { idCl = std.ClassID }
            })
            costs.map((cost) => {
                if(cost.ClassID == idCl) { arrCost.push(cost); }
            })
        }
        return arrCost
    }

    function sumCost() {
        const sum = getCost().reduce((a, b) => a + parseInt(b.CostAmountMoney), 0)
        return sum;
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setBill((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    const handleSubmit = async () => {
        var idCl = "";

        if (user.Role == "Teacher") {
            classes.map((cls) => {
                if (user.UserName === cls.TeacherClassUserName) { idCl = cls.ClassID }
            })
        }

        try {
            bill.CostID = "4";
            bill.ClassID = idCl;

            console.log(bill);

            useEffect (() => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bill)
                };
                fetch('http://127.0.0.1:8000/api/cost', requestOptions)
                    .then(response => response.json())
                    .catch(error => {
                        console.log('error',error)
                    });
            },[])
            alertNav.success("Add cost Successfully: ");
        }
        catch (error) {
            alertNav.error("Add cost Error: ");
        }
    }

    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="cost">
                    <div className="cost-content">
                        {user?.Role === "Parent" && (
                            <div className="head-cost-content">
                                <div>
                                    <h2>Lich su chi tieu</h2>
                                    <p>Tong chi tieu trong nam: {sumCost()}</p>
                                </div>
                            </div>
                        )}
                        {user?.Role === "Teacher" && (
                            <div className="head-cost-content" style={{display:"flex"}}>
                                <div>
                                    <h2>Lịch sử chi tiêu</h2>
                                    <p>Tổng chi tiêu trong năm: {sumCost()}</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-add-cost"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                >Thêm mới</button>
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
                                                    <div className="form-group">
                                                        <label htmlFor="">Loại chi tiêu:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="CostType"
                                                            placeholder="Nhập loại chi tiêu"
                                                            value={bill.CostType}
                                                            onChange={handleOnChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="">Tổng tiền:</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="CostAmountMoney"
                                                            placeholder="Nhập tổng tiền"
                                                            value={bill.CostAmountMoney}
                                                            onChange={handleOnChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="">Chi tiết:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="CostDescription"
                                                            placeholder="Nhập chi tiết"
                                                            value={bill.CostDescription}
                                                            onChange={handleOnChange}
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
                                                >
                                                    Đóng
                                                </button>
                                                <button
                                                    style={{ fontSize: 14 }}
                                                    onClick={handleSubmit}
                                                    type="button"
                                                    className="btn btn-primary"
                                                >
                                                    Thêm chi tiêu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="cost-box">
                            {
                                getCost().map((cost) => {
                                    return (
                                        <div key={cost.CostID} style={{borderTop:"1px solid #ccc",padding:"10px 0"}}>
                                            <h3>{cost.CostType}</h3>
                                            <p>Chi tiết: </p>
                                            <p>{cost.CostDescription}</p>
                                            <p>Tổng cộng: </p>
                                            <p>{parseInt(cost.CostAmountMoney)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cost;
