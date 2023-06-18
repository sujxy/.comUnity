import { useTheme } from "@emotion/react";
import {
  CallRounded,
  VideoCallRounded,
  ReportRounded,
  SendRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Message from "components/Message";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import react, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addmessage } from "api/message";

const ChatBox = ({
  currentChat,
  currentUser,
  setSendMessage,
  receiveMessage,
}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [sender, setSender] = useState(null);
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState("");
  const scroll = useRef();
  //get sender of this chat
  useEffect(() => {
    const senderId = currentChat?.members?.find((id) => id != currentUser);
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${senderId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setSender(data);
    };

    if (currentChat !== null) getUser();
  }, [currentChat, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  //render with recieved message
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === currentChat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // get this chat's messages
  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(
        `http://localhost:3001/message/${currentChat._id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setMessages(data);
    };

    if (currentChat !== null) getMessages();
  }, [currentChat]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const newMessage = {
      chatId: currentChat._id,
      senderId: currentUser,
      text: text,
    };

    const { data } = await addmessage(newMessage);

    const recieverId = currentChat.members.find((id) => id !== currentUser);
    setSendMessage({ ...newMessage, recieverId });

    setMessages([...messages, data]);
    setText("");
  };

  // scroll to latest
  // useEffect(() => {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  if (!sender) {
    return <p>loading..</p>;
  }
  return (
    <WidgetWrapper
      display="flex"
      flexDirection="column"
      height="97%"
      width="100%"
      sx={{ p: 0 }}
    >
      {currentChat ? (
        <>
          {/* header */}

          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            backgroundColor={palette.background.alt}
            sx={{
              borderRadius: "1rem 1rem 0 0 ",
              p: "0.7rem 2rem 0.7rem 2rem",
            }}
          >
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              spacing={2}
            >
              <UserImage image={sender.picturePath} size="50px" />
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="medium"
                  sx={{
                    color: palette.neutral.dark,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.dark,
                    },
                  }}
                  onClick={() => navigate(`/profile/${sender._id}`)}
                >
                  {`${sender.firstName} ${sender.lastName}`}
                </Typography>
                <Typography variant="h6" color={palette.neutral.medium}>
                  {sender.description}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <IconButton>
                <CallRounded sx={{ color: palette.neutral.main }} />
              </IconButton>
              <IconButton>
                <VideoCallRounded sx={{ color: palette.neutral.main }} />
              </IconButton>
              <IconButton>
                <ReportRounded sx={{ color: palette.neutral.main }} />
              </IconButton>
            </Stack>
          </Stack>

          <Box
            sx={{
              boxShadow: "inset 0px 2px 5px rgba(0, 0, 0, 0.1)",
              flexGrow: 1,
              overflowY: "scroll",
              backgroundColor: palette.background.alt,
              p: "0 1rem 0 0",
            }}
            // border="1px solid red"
          >
            {messages?.map((message, i) => (
              <Message
                key={i}
                isOwnMessage={message.senderId === currentUser ? true : false}
                message={message}
                sender={sender.picturePath}
              />
            ))}
          </Box>
          <Stack
            direction="row"
            width="100%"
            spacing={1}
            justifyContent="center"
            sx={{ py: 2 }}
          >
            <TextField
              placeholder={"write a message..."}
              sx={{ width: "75%" }}
              value={text}
              onChange={handleChange}
            ></TextField>
            {/* <InputEmoji value={text} onChange={handleChange} /> */}
            <Button
              onClick={handleSend}
              sx={{
                width: "20%",
                color: palette.neutral.light,
                backgroundColor: palette.primary.dark,
                borderRadius: 2,
              }}
              endIcon={<SendRounded sx={{ color: palette.neutral.light }} />}
            >
              Send
            </Button>
          </Stack>
        </>
      ) : (
        <Box sx={{ textAlign: "center", mx: "auto" }}>
          <Typography variant="subtitle1">
            Tap on chat to start conversation..
          </Typography>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ChatBox;
