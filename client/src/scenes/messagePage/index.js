import react from "react";
import Navbar from "scenes/navbar";
import { Box, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const MessagePage = () => {
  const { palette } = useTheme();

  return (
    <Box backgroundColor={palette.background.default} width="100vw">
      <Navbar />
      <FlexBetween
        sx={{
          height: "100vh",
          alignItems: "normal",
          justifyContent: "center",
          p: "1rem 5%",
        }}
      >
        {/* <Box flexBasis="30%">
          <ConversationWidget />
        </Box>
        <Box flexBasis="50%">
          <ChatBox />
        </Box> */}
      </FlexBetween>
    </Box>
  );
};

export default MessagePage;
