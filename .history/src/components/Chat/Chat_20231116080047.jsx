import React from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Message from "../Message/Message";
import ChatInput from "../Chatinput/ChatInput";
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import { db } from "../../firebase";
import { doc, query } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    flex-grow: 1;
    overflow-y: scroll;
    font-size: 14px;
  }

  > h5 > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

function Chat() {
  const roomId = useSelector(selectRoomId);
  const docRef = roomId && doc(db, "rooms", roomId);
  const [roomDetails] = useDocument(roomId && docRef);
  const [roomMessage, loading] = useCollection(roomId && query(collection));

  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong># {roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeaderLeft>
          <HeaderRight>
            <h5>
              <InfoOutlinedIcon />
              Details
            </h5>
          </HeaderRight>
        </Header>

        <ChatMessages>
          <Message
            key={doc.id}
            message="message"
            timestamp="timestamp"
            user="user"
            userImage="userImage"
          />

          <ChatBottom />
        </ChatMessages>

        <ChatInput channelId={roomId} channelName={roomDetails?.data().name} />
      </>
    </ChatContainer>
  );
}

export default Chat;
