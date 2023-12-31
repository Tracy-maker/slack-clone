import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;

function ChatInput({ channelId, channelName, chatRef }) {
  const sendMessage = (e)=>{
    e.preventDefault();
  }
  return (
    <ChatInputContainer>
      <form action="POST">
        <input placeholder={`Message #Room`} />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
