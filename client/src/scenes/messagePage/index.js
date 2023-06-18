import react, { useEffect, useState, useRef } from "react";
import Navbar from "scenes/navbar";
import { Box, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ConversationWidget from "scenes/widgets/chats/ConversationWidget";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "scenes/widgets/chats/ChatBox";
import { setChats } from "state";
import { SignalCellularConnectedNoInternet1BarOutlined } from "@mui/icons-material";
import { io } from "socket.io-client";

const MessagePage = () => {
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const token = useSelector((state) => state.token);
  const currentChat = useSelector((state) => state.currentChat);
  const chats = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const socket = useRef();

  //get user chats api
  const getUserChats = async () => {
    const response = await fetch(`http://localhost:3001/chats/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setChats({ chats: data }));
  };

  //client connection to soket
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", _id);
    socket.current.on("get-users", (users) => setOnlineUsers(users));
  }, [_id]); //eslint-disable-line react-hooks/exhaustive-deps

  //handling sent message
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]); //eslint-disable-line react-hooks/exhaustive-deps

  //handling recieved message
  useEffect(() => {
    socket.current.on("receive-message", (data) => setReceiveMessage(data));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //render user-chat list
  useEffect(() => {
    getUserChats();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box backgroundColor={palette.background.default} width="100vw">
      <Navbar />
      <FlexBetween
        sx={{
          height: "88vh",
          alignItems: "normal",
          justifyContent: "center",
          p: "1rem 5% ",
          gap: "1rem",
        }}
      >
        <Box flexBasis="30%" height="100%">
          <ConversationWidget chats={chats} currentUser={_id} />
        </Box>
        <Box flexBasis="60%">
          <ChatBox
            currentUser={_id}
            currentChat={currentChat}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default MessagePage;
