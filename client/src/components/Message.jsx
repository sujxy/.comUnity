import { Box, Stack, Typography } from "@mui/material";
import react, { useState } from "react";
import UserImage from "./UserImage";
import { useTheme } from "@emotion/react";
import { format } from "timeago.js";

const Message = ({ isOwnMessage, message, sender }) => {
  const { palette } = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent={isOwnMessage ? "end" : "start"}
      alignItems="center"
      sx={{ p: "8px 8px 0", width: "100%" }}
      spacing={1}
    >
      {!isOwnMessage && <UserImage image={sender} size="30px" />}
      <Box
        sx={{
          p: 1.5,
          backgroundColor: isOwnMessage
            ? palette.primary.light
            : palette.primary.dark,
          borderRadius: isOwnMessage ? "12px 12px 0 12px" : "12px 12px 12px 0",
          width: "max-content",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: isOwnMessage ? palette.neutral.dark : palette.neutral.light,
          }}
        >
          {message.text}
        </Typography>
      </Box>
      {/* {(
        <Typography variant="caption">{format(message.createdAt)}</Typography>
      )} */}
    </Stack>
  );
};

export default Message;
