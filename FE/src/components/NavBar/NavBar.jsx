import React, { useEffect } from "react";
import "./NavBar.css";
export default function NavBar() {
  useEffect(() => {
    const body = document.querySelector("body");
    body.onclick = () => {
      const toggle = document.querySelector("#collapseExample");
      toggle.classList.remove("show");
    };
  }, []);
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
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            />
            <img class="vector-icon" alt="" src="./img/vector.svg" />
          </div>
          <img class="notificatios-icon" alt="" src="./img/notificatios.svg" />
          <div class="button-div" style={{ backgroundColor: "blue" }}>
            <img class="plus-circle-icon" alt="" src="./img/pluscircle.svg" />

            <div class="ask-a-question">Ask a question</div>
          </div>
        </div>

        <div
          class="collapse"
          id="collapseExample"
          style={{ marginTop: "180px" }}
        >
          <div
            class=""
            style={{
              width: "200px",
              background: "blue",
              borderRadius: "6px",
              marginRight: 20,
            }}
          >
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </div>
      </div>
    </div>
  );
}
