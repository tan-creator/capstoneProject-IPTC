import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import "./noti.css";
export default function noti() {
  const [notis, set_notis] = useState([]);
  useEffect(() => {
    axios("http://127.0.0.1:8000/notification")
      .then((response) => response.data)
      .then((json) => {
        console.log(json);
        set_notis([...json]);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="forum-content">
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <form action="" method="POST" role="form">
                <legend>Form title</legend>

                <div class="form-group">
                  <label for="">label</label>
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Input field"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="annouce">
            <span>
              <i className="bx bxs-notepad" />
              THÔNG BÁO
            </span>
          </div>
          {notis.map(function (noti) {
            return (
              <div className="box" key={noti.Phone}>
                <div className="box-profile">
                  <img
                    className="box-img-avatar"
                    src="./img/avatar.svg"
                    alt=""
                  />
                  <div className="box-info">
                    <div className="box-user-top">
                      <h4 className="card-user-name">{noti.ParentUserName}</h4>
                      <i className="bx bxs-check-circle" />
                    </div>
                    <div className="box-user-desc">{noti.NotificationDate}</div>
                  </div>
                </div>
                <div className="box-question">
                  <div className="box-main-question">
                    {noti.NotificationTitle}
                  </div>
                  <div className="box-subtitle">{noti.NotificationContent}</div>
                </div>
              </div>
            );
          })}
          <div className="content-right">
            <div className="anounce box">
              <div className="pb10">
                <i className="bx bxs-notepad" />
                <span>Thông báo</span>
              </div>
              <div>
                <a href="#">
                  <i className="bx bxs-circle" />
                  Lịch thi học kỳ I 2022 - 2023
                </a>
              </div>
              <div>
                <a href="#">
                  <i className="bx bxs-circle" />
                  Lịch họp phụ huynh học kỳ I 2022 - 2023
                </a>
              </div>
              {/*  */}

              <div className="pt10 pb10">
                <i className="bx bxs-help-circle" />
                <span>Trợ giúp</span>
              </div>
              <div>
                <a href="#">
                  <i className="bx bxs-circle" />
                  Cần giúp đỡ?
                </a>
              </div>
              <div>
                <a href="#">
                  <i className="bx bxs-circle" />
                  Tư vấn tuyển sinh
                </a>
              </div>
              <div>
                <a href="#">
                  <i className="bx bxs-circle" />
                  Thông tin về nhà trường
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
