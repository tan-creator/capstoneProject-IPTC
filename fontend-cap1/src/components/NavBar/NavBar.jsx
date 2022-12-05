import React from "react";
import "./NavBar.css";
export default function NavBar() {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <img src="./img/logo.svg" alt="#" />
            <span className="title-header">IPTC</span>
          </div>
        </div>
        <div className="header-right">
          <div class="profile-div">
            <img
              class="profile-pic-icon"
              alt=""
              src="./img/profilepic@2x.png"
            />
            <img class="vector-icon" alt="" src="./img/vector.svg" />
          </div>
          <img class="notificatios-icon" alt="" src="./img/notificatios.svg" />
          <div class="button-div">
            <img class="plus-circle-icon" alt="" src="./img/pluscircle.svg" />
            <div class="ask-a-question">Ask a question</div>
          </div>
        </div>
      </div>
    </div>
  );
}
