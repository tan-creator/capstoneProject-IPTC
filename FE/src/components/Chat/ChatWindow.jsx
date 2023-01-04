import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import Message from "./Message";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    box-sizing: content-box;

    .header {
        &__title {
            font-weight: bold;
            margin: 0;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;

    Button {
        margin-left: 10px;
    }
`;

const WrapperStyled = styled.div`
    height: calc(100vh - 140px);
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px 11px 0 11px;
    justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
  height : 468.82px;
  display: flex;
  flex-direction: column;
`;

const ChatWindow = () => {
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">Room1</p>
                </div>
                <ButtonGroupStyled>
                    <Avatar.Group size="samll" maxCount={2}>
                        <Tooltip title="A">
                            <Avatar>A</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                    <Button icon={<UserAddOutlined />}>Mời</Button>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled >
                    <Message
                        key="key"
                        text="text"
                        photoURL={null}
                        displayName="displayName"
                        createdAt={1}
                    />
                    <Message
                        key="key"
                        text="text"
                        photoURL={null}
                        displayName="displayName"
                        createdAt={2}
                    />
                    <Message
                        key="key"
                        text="text"
                        photoURL={null}
                        displayName="displayName"
                        createdAt={3}
                    />
                </MessageListStyled>
                <FormStyled >
                    <Form.Item name='message'>
                        <Input
                            placeholder='Nhập tin nhắn...'
                            bordered={false}
                            autoComplete='off'
                        />
                    </Form.Item>
                    <Button type='primary' >
                        Gửi
                    </Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    )
}

export default ChatWindow
