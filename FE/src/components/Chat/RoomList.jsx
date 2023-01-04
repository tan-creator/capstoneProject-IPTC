import React from 'react'
import { PlusSquareOutlined } from "@ant-design/icons";
import { Avatar, Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { useState } from 'react';
import { useLayoutEffect } from 'react';

const {Panel} = Collapse

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color: #000;
        }
        .ant-collapse-content-box {
            padding: 0 40px;
        }
        .btn-add-room {
            color: #000;
            padding: 0;
        }
        .btn-add-room:hover {
            background-color: white;
            color: #000;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

const RoomList = (props) => {
    const [rooms, setRooms] = useState([]);
    const account = props.account;
    const [ newRoom, setNewRoom] = useState({
        roomName: "",
        createAt: "",
        members: [],
    })
    const arrDemo = [];


    useLayoutEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then (response => response.json())
            .then(json => {
                setRooms(json)
            })
            .catch(error => console.log('error',error));
    },[newRoom])

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setNewRoom((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    const handleNewRoom = () => {
        const input = document.querySelector(".form-control");
        if(input.value == "") {
            alert("Nhập tên phòng");
            return;
        }

        const today = new Date();
        const time = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        newRoom.createAt  = time;
        newRoom.members[0] = account.UserName;

        arrDemo.push(newRoom)
        console.log(arrDemo);
        input.value = "";
    }

    return (
        <div className='box-rooms'>
            <Collapse ghost defaultActiveKey={['1']} style={{borderRadius:'0'}}>
                <PanelStyled header="Danh sach cac phong" key="1" style={{borderRadius:'0'}}>
                    <div className='box-rooms-list'>
                        <Button
                            className="btn-add-room"
                            type="button"
                            icon={<PlusSquareOutlined/>}
                            data-toggle="modal"
                            data-target="#exampleModal"
                            >Thêm phòng
                        </Button>
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
                                        <form action="" method="POST" role="form">
                                            <div className="form-group">
                                                <label htmlFor="">Tên phòng:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="roomName"
                                                    placeholder="Nhập tên phòng"
                                                    value={newRoom.roomName}
                                                    onChange={handleOnChange}
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
                                            onClick={handleNewRoom}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='rooms-list'>
                            {
                                rooms.map((room) => {
                                    return (
                                        <LinkStyled key={room.id}>
                                            <Avatar src={room?.photoURL}>{room?.photoURL ? '' : room.name?.charAt(0)?.toUpperCase()}</Avatar>
                                            <div className='room-name' >{room.name}</div>
                                        </LinkStyled>
                                    )
                                })
                            }
                        </div>
                    </div>
                </PanelStyled>
            </Collapse>
        </div>
    )
}

export default RoomList
