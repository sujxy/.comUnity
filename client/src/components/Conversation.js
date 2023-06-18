import { useTheme } from "@emotion/react";
import { Badge, Box, IconButton, Stack, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import react, { useEffect, useState ,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import { setCurrentChat } from "state";
import { io } from 'socket.io-client';

const Conversation = ({
  data,
  currentUser,
  chatIndex,
  isSelected,
  setCurrentIndex,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const senderId = data.members.find((id) => id != currentUser);
  const [sender, setSender] = useState(null);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${senderId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setSender(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!sender) {
    return null;
  }
  return (
    <Box
      onClick={() => {
        setCurrentIndex(chatIndex);
        dispatch(setCurrentChat({ currentChat: data }));
      }}
      sx={{
        backgroundColor: isSelected ? palette.primary.extraLight : null,
        width: "90%",
        borderRadius: 3,
        p: "0.5rem 1rem",
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Badge
            variant="dot"
            invisible={false}
            color="success"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <UserImage image={sender.picturePath} size="50px" />
          </Badge>

          <Stack>
            <Typography
              variant="h5"
              fontWeight="medium"
              color={palette.neutral.dark}
            >
              {`${sender.firstName} ${sender.lastName}`}
            </Typography>
            <Typography variant="subtitle2" color={palette.neutral.medium}>
              some random text message
            </Typography>
          </Stack>
        </Stack>
        <IconButton>
          <DeleteOutline />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Conversation;
