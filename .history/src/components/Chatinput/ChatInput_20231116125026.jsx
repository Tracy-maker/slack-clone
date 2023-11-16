import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [input, setInput] = useState("");
  const [user]=useAuthState(auth)

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    const docRef = doc(db, "rooms", channelId);
    const colRef = collection(docRef, "messages");

    addDoc(colRef, {
      message: input,
      timestamp: serverTimestamp(),
      user: "123",
      userImage:user.photoURL
    });

    setInput("");
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ChatInputContainer>
      <form action="POST">
        <input
          placeholder={`Message ${channelName}`}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
