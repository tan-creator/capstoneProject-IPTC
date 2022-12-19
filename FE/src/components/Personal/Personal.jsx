import React, { useEffect, useState, useLayoutEffect, memo } from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import {useAlert} from "react-alert";
import "./personal.css";
export default function Personnal() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...user });
        console.log(account);
    }, []);

    // useEffect(() => {
    //     const students = JSON.parse(localStorage.getItem("students"));
    //     const classes = JSON.parse(localStorage.getItem("classes"));

    //     const findStudent = students.find(
    //         (student) => student?.ParentUserName == account?.UserName
    //     );
    //     const findclassID = classes.find(
    //         (cls) => cls?.classID == user?.classID
    //     );
    //     user.childrenName = findStudent?.StudentName;
    //     user.classID = findStudent?.ClassID;
    //     user.className = findclassID?.ClassName;
    //     setAccount({ ...user });
    // },[])

    const [dataUpdate, setDataUpdate] = useState({
        Names: "",
        BirthDay: "",
        Phone: "",
    });
    const alertNav = useAlert();
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setDataUpdate((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    const handleSubmit = async (e) => {
        const value = e.target.value;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataUpdate)
        };
        fetch(`http://127.0.0.1:8000/api/user/${value}`, requestOptions)
        .then((response)  => {
            if (response.status == 200) {
                console.log("Thành công\n");
                alertNav.success("Cập nhập thành công: ");
            } else {
                console.log("Thất bại\n");
                alertNav.error("Cập nhập thất bại: ");
            }
        })
        .catch(error => {
            alertNav.error("Fetch thất bại: ");
            console.log('error',error)
        });
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <Sidebar />
                <div className="Personnal">
                    <div className="func-title-user">
                        <span>THÔNG TIN CÁ NHÂN</span>
                    </div>

                    <div className="info-basic">
                        <div className="info">
                            <InfoUser infoAccount={account}/>

                            <button
                                type="button"
                                className="btn-add-cost"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                value={account.UserName}
                                onClick={(e) => {
                                    console.log(e.target.value);
                                }}
                            >Sửa thông tin</button>
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
                                            <form action="" method="PUT" role="form">
                                                <div className="form-group">
                                                    <label htmlFor="">Tên</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="Names"
                                                        placeholder="Nhập tên của bạn"
                                                        value={dataUpdate.Names}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">Ngày sinh</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="BirthDay"
                                                        value={dataUpdate.BirthDay}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="">Số điện thoại</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="Phone"
                                                        placeholder="Nhập số điện thoại của bạn"
                                                        value={dataUpdate.Phone}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                                {/* <div className="form-group">
                                                    <label htmlFor="">Ảnh đại diện</label>
                                                    <input
                                                        type="image"
                                                        className="form-control"
                                                        name="CostDescription"
                                                        // placeholder="Nhập chi tiết"
                                                        // value={bill.CostDescription}
                                                        // onChange={handleOnChange}
                                                    />
                                                </div> */}
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
                                                value={account.UserName}
                                            >
                                                Cập nhập
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="person-img">
                            <img
                                src={account.Images}
                                style={{ width: "200px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InfoUser = memo ((props) => {


    const [getData, setGetData] = useState({});
    useLayoutEffect(() => {
        if (props.infoAccount !== getData) {
            setGetData(props.infoAccount)
        }

    }, [getData])

    return (
        <div>
            <div className="txtcel1">
                {getData.Role === "Teacher"
                    ? "Tên giáo viên: "
                    : "Tên Cha/Mẹ: "}
            </div>
            <div className="txtcel2" id="txtName">
                <strong>{getData.Names}</strong>
            </div>
            <div className="txtcel1">Tên đăng nhập</div>
            <div className="txtcel2" id="txtName">
                <strong>{getData.UserName}</strong>
            </div>
            <div className="txtcel1">Tên học sinh:</div>
            <div className="txtcel2">
                <span>{getData?.childrenName}</span>
            </div>
            <div className="txtcel1">Vai trò:</div>
            <div className="txtcel2">
                {getData.Role === "Teacher"
                    ? "Giáo viên"
                    : "Phụ huynh"}
            </div>
            {getData?.Role === "Parent" && (
                <>
                    <div className="txtcel1">Lớp: </div>
                    <div className="txtcel2">
                        {getData?.className}
                    </div>
                </>
            )}

            <div className="txtcel1">Bằng cấp:</div>
            <div className="txtcel2">
                <span>{getData?.Degree}</span>
            </div>
            <div className="txtcel1">Ngày sinh:</div>
            <div className="txtcel2">
                <span>{getData.BirthDay}</span>
            </div>

            <div className="txtcel1">Phone:</div>
            <div className="txtcel2">{getData.Phone}</div>
        </div>
    )
})
