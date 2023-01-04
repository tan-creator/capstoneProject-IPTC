import React, { useEffect, useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { Col, Row } from "antd";
import "./Chat.css"
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Layout/DefaultLayout/Sidebar/Sidebar';


const Chat = () => {
    const [account, setAccount] = useState({})
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...users})
    },[])


    return (
        <div>
            <NavBar />
            <Sidebar />
            <div className="container">
                <div className="chat-content">
                    <Row>
                        <Col span={6}>
                            <ChatSidebar account={account}/>
                        </Col>
                        <Col span={18}>
                            <ChatWindow />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Chat
