import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import axios from "axios";
import "./personal.css";
export default function Personnal() {
  const [persons, SetPerson] = useState([]);
  useEffect(() => {
    axios("http://127.0.0.1:8000/api/student")
      .then((response) => response.data)
      .then((json) => {
        console.log(json);
        SetPerson([...json]);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="Personnal">
          <div className="func-title-user">THÔNG TIN CÁ NHÂN</div>
          {persons.map(function (person) {
            return (
              <div className="info-basic">
                <div className="info">
                  <div className="txtcel1">Tên Học sinh:</div>
                  <div className="txtcel2" id="txtName">
                    <strong>{person.StudentName}</strong>
                  </div>
                  <div className="txtcel1">Tên Cha/Mẹ:</div>
                  <div className="txtcel2" id="txtName">
                    <strong>{person.ParentUserName}</strong>
                  </div>
                  <div className="txtcel1">Mã Học sinh:</div>
                  <div className="txtcel2" style={{}}>
                    {person.StudentID}
                  </div>
                  <div className="txtcel1">Lớp:</div>
                  <div className="txtcel2">{person.ClassID}</div>
                  <div className="txtcel1">Giới tính:</div>
                  <div className="txtcel2">Nam&nbsp;</div>
                  <div className="txtcel1">Ngày sinh:</div>
                  <div className="txtcel2">
                    <span>{}</span>
                  </div>
                  <div className="txtcel1">Email:</div>
                  <div className="txtcel2">{}</div>
                </div>
                <div className="person-img">
                  <img
                    src="./img/avatar-person.png"
                    style={{ width: "400px" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
