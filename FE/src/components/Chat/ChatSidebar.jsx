import React from 'react';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from "styled-components";

const SidebarStyled = styled.div`
    height: calc(100vh - 140px);
    border-right: 1px solid #ccc
`

const SidebarChat = (props) => {
    return (
        <SidebarStyled>
            <UserInfo account={props.account} />
            <RoomList account={props.account} />
        </SidebarStyled>
    )
}

export default SidebarChat
