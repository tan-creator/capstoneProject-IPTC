import React from 'react';
import styled from "styled-components";
import { Avatar, Button, Typography } from "antd";

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;

    .userName {
        color: #000;
        margin-left: 10px;
        font-weight: bold;
    }
`

const UserInfo = (props) => {
    const account = props.account;
    return (
        <WrapperStyled>
            <div>
                <Avatar src={account.Images}></Avatar>
                <Typography.Text className="userName">{account.Names}</Typography.Text>
            </div>
        </WrapperStyled>
    )
}

export default UserInfo
