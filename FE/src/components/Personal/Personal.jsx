import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import isValidBirthdate from "is-valid-birthdate";
import NavBar from "../NavBar/NavBar";
import { useAlert } from "react-alert";
import axios from "axios";
import "./personal.css";
export default function Personnal() {
    const alert = useAlert();

    let [account, setAccount] = useState({});
    const [dataUpdate, setDataUpdate] = useState({
        Names: "",
        BirthDay: "",
        Phone: "",
        oldPassword: "",
        newPassword: "",
        verifyPassword: "",
    });
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setDataUpdate((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    const handleSubmit = async (e) => {
        if (dataUpdate.oldPassword) {
            if (!dataUpdate.newPassword || !dataUpdate.verifyPassword) {
                return alert.error("Vui lòng nhập mật khẩu mới!");
            }
            if (dataUpdate.oldPassword === dataUpdate.newPassword) {
                return alert.error(
                    "Mật khẩu cũ và mới không được giống nhau"
                );
            }
            const result = await axios.post(
                `http://127.0.0.1:8000/api/resetPassword?UserName=${account.UserName}&oldPassword=${dataUpdate.oldPassword}&newPassword=${dataUpdate.newPassword}&verifyPassword=${dataUpdate.verifyPassword}`
            );
            const { statusCode, msg } = result.data;
            if (statusCode !== 200) {
                return alert.error(msg);
            }
            return alert.success(msg);
        }
        const value = e.target.value;
        if (!isValidBirthdate(dataUpdate?.BirthDay)) {
            return alert.error("Vui lòng nhập chính xác ngày sinh");
        }
        await axios
            .put(`http://127.0.0.1:8000/api/user/${value}`, { ...dataUpdate })
            .then((response) => {
                if (response.status == 200) {
                    console.log("Thành công\n");
                    alert.success("Cập nhập thành công: ");
                } else {
                    console.log("Thất bại\n");
                    alert.error("Cập nhập thất bại: ");
                }
            })
            .catch((error) => {
                alert.error("Fetch thất bại: ");
                console.log("error", error);
            });
        const newAccount = {
            ...account,
            ...dataUpdate,
        };
        localStorage.setItem("account", JSON.stringify(newAccount));
        setAccount({ ...newAccount });
    };
    const handleUpdate = (dataUpdate) => {
        console.log(dataUpdate);
        setDataUpdate({
            Names: dataUpdate?.Names,
            BirthDay: dataUpdate?.BirthDay,
            Phone: dataUpdate?.Phone,
        });
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...user });
    }, []);

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
                            <div className="txtcel1">
                                {account?.Role === "Teacher"
                                    ? "Tên giáo viên: "
                                    : "Tên Cha/Mẹ: "}
                            </div>
                            <div className="txtcel2" id="txtName">
                                <strong>{account?.Names}</strong>
                            </div>
                            <div className="txtcel1">Tên đăng nhập</div>
                            <div className="txtcel2" id="txtName">
                                <strong>{account?.UserName}</strong>
                            </div>
                            <div className="txtcel1">Vai trò:</div>
                            <div className="txtcel2">
                                {account?.Role === "Teacher"
                                    ? "Giáo viên"
                                    : "Phụ huynh"}
                            </div>
                            {account?.Role === "Parent" && (
                                <>
                                    <div className="txtcel1">Tên học sinh:</div>
                                    <div className="txtcel2">
                                        <span>
                                            {account.MoreInfo[0].StudentName}
                                        </span>
                                    </div>
                                </>
                            )}
                            {account?.Role === "Parent" && (
                                <>
                                    <div className="txtcel1">Mã học sinh: </div>
                                    <div className="txtcel2">
                                        {account.MoreInfo[0].StudentID}
                                    </div>
                                </>
                            )}
                            {account?.Role === "Parent" && (
                                <>
                                    <div className="txtcel1">Lớp: </div>
                                    <div className="txtcel2">
                                        {account.MoreInfo[0].ClassName}
                                    </div>
                                </>
                            )}
                            <div className="txtcel1">Bằng cấp:</div>
                            <div className="txtcel2">
                                <span>{account.Degree}</span>
                            </div>
                            <div className="txtcel1">Ngày sinh:</div>
                            <div className="txtcel2">
                                <span>{account.BirthDay}</span>
                            </div>
                            <div className="txtcel1">Phone:</div>
                            <div className="txtcel2">{account.Phone}</div>
                            <div className="info-basic">
                                <div className="info">
                                    <button
                                        type="button"
                                        className="btn-add-cost"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        value={account.UserName}
                                        style={{
                                            marginTop: "20px",
                                            marginLeft: "200px",
                                            fontSize: 16,
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => handleUpdate(account)}
                                    >
                                        UPDATE
                                    </button>
                                    <div
                                        className="modal fade"
                                        id="exampleModal"
                                        tabIndex="-1"
                                        role="dialog"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <form
                                                        action=""
                                                        method="PUT"
                                                        role="form"
                                                    >
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Tên
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Names"
                                                                placeholder="Nhập tên của bạn"
                                                                value={
                                                                    dataUpdate?.Names
                                                                }
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Ngày sinh
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="BirthDay"
                                                                value={
                                                                    dataUpdate?.BirthDay
                                                                }
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Số điện thoại
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="Phone"
                                                                placeholder="Nhập số điện thoại của bạn"
                                                                value={
                                                                    dataUpdate?.Phone
                                                                }
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Mật khẩu cũ
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                name="oldPassword"
                                                                placeholder="Nhập mật khẩu cũ"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Mật khẩu mới
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                name="newPassword"
                                                                placeholder="Nhập mật khẩu mới"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                            Nhập lại mật khẩu mới
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                name="verifyPassword"
                                                                placeholder="Nhập lại mật khẩu mới"
                                                                onChange={
                                                                    handleOnChange
                                                                }
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
                                                        type="button"
                                                        className="btn btn-primary"
                                                        value={account.UserName}
                                                        onClick={handleSubmit}
                                                    >
                                                        Cập nhập
                                                    </button>
                                                </div>
                                            </div>
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
