import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  addDoc,
  auth,
  collection,
  db,
  doc,
  getDoc,
  serverTimestamp,
} from "../services/firebase";

function ChatInput({ channelId, channelName, chatRef }) {
  //   const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

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
      user: user.displayName,
      userImage: user.photoURL,
    })
      .then(() => setInput(""))
      .catch((e) => console.log(e));

    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ChatInputContainer>
      <form action="POST">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
