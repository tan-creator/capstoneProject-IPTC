import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import { getUser } from "./../../helpers/getUser";
import "./Forum.css";

export default function Forum() {
  const users = getUser();

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="forum-content">
          {users.map((user) => (
            <div className="box" key={user.Phone}>
              <div className="box-profile">
                <img className="box-img-avatar" src={user.Images} alt="" />
                <div className="box-info">
                  <div className="box-user-top">
                    <h4 className="card-user-name">{user.Names}</h4>
                    <i className="bx bxs-check-circle" />
                  </div>
                  <div className="box-user-desc">{user.BirthDay}</div>
                </div>
              </div>
              <div className="box-question">
                <div className="box-main-question">{user.Role}</div>
                <div className="box-subtitle">{user.Phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
