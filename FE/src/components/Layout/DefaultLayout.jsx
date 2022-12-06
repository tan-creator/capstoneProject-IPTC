import React from "react";
import Content from "../Content/Content";
import Header from "./DefaultLayout/Header/index";
import Sidebar from "./DefaultLayout/Sidebar/Sidebar";

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <Content />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
