import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

import ChatInput from "./ChatInput";
import { selectRoomId } from "../features/appSlice";
import { collection, db, doc, orderBy, query } from "../services/firebase";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);

  const roomId = useSelector(selectRoomId);
  const docRef = roomId && doc(db, "rooms", roomId);
  const [roomDetails] = useDocument(roomId && docRef);
  const [roomMessages, loading] = useCollection(
    roomId && query(collection(docRef, "messages"), orderBy("timestamp", "asc"))
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            channelId={roomId}
            channelName={roomDetails?.data().name}
            chatRef={chatRef}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;