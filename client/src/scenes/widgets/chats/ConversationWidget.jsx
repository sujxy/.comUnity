import { useEffect, useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import {
  useTheme,
  IconButton,
  InputBase,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "state";
import Conversation from "components/Conversation";
import { SearchRounded } from "@mui/icons-material";

const ConversationWidget = ({ chats, currentUser }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        fontWeight="bold"
        color={palette.neutral.dark}
        mb="0.5rem"
      >
        Conversations
      </Typography>
      <Divider />
      <FlexBetween
        backgroundColor={palette.neutral.light}
        borderRadius="18px"
        mt="0.5rem"
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

      <Stack spacing={0.7} alignItems="center" overflow="scroll" py="1rem">
        {chats?.map((chat, index) => {
          return (
            <Conversation
              key={index}
              chatIndex={index}
              data={chat}
              currentUser={currentUser}
              setCurrentIndex={setCurrentIndex}
              isSelected={index === currentIndex ? true : false}
            />
          );
        })}
      </Stack>
    </WidgetWrapper>
  );
};

export default ConversationWidget;
