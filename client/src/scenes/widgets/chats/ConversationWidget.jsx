import { useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import {
  useTheme,
  IconButton,
  InputBase,
  Typography,
  Box,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";

const ConversationWidget = () => {
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getUserChats = async () => {
    const response = await fetch(`http://localhost:3001/chats/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
  };

  return (
    <WidgetWrapper>
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="18px"
        padding="0.1rem 1.5rem"
      >
        <InputBase
          placeholder="Search.."
          sx={{ "&:hover": { cursor: "pointer" } }}
        />
        <IconButton>
          <SearchRounded />
        </IconButton>
      </FlexBetween>
      <Typography
        variant="h5"
        fontWeight="bold"
        color={palette.neutral.dark}
        my="1rem"
      >
        Conversations
      </Typography>
    </WidgetWrapper>
  );
};

export default ConversationWidget;
