import React from "react";
export default function Header() {
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
          <button type="submit">
            <img src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/bb3cefe8-bcf2-4173-9ad5-8e7aa3dd0664/1c4b9433-f3c9-4b80-a813-1ee4fa514311?org_if_sml=1870" />
            <span className="register">Register</span>
          </button>
          <button className="button-login">
            <span className="login">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
