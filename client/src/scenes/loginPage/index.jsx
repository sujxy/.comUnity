import { Box, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import Form from "./form";
import React from "react";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);

  return (
    <Box>
      <img
        src={`http://localhost:3001/assets/webVector1.png`}
        height="218.98px"
        width="558.33px"
        style={{
          position: "absolute",
          left: "880px",
          top: "0",
          zIndex: "-1",
        }}
      />
      <Box
        p="2rem"
        mt="5rem"
        mx="auto"
        width="550px"
        height="auto"
        backgroundColor={theme.palette.background.alt}
        boxShadow="3"
        borderRadius="1.5rem"
        position="relative"
        zIndex="1"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FlexBetween gap="0.3rem" mt="-10px" width="20%">
            <Typography
              fontFamily="Oswald"
              fontWeight="bold"
              fontSize="clamp(1rem,2rem,2.3rem)"
              mt="4.5px"
              color={mode === "dark" ? "white" : "black"}
            >
              .com
            </Typography>
            <Typography
              fontFamily="Pacifico"
              sx={{ "&hover": { cursor: "pointer" } }}
              fontSize="clamp(1.6rem,2.6rem,2.9rem)"
              color={theme.palette.primary.main}
              fontWeight="400"
              ml="-5px"
            >
              unity
            </Typography>
          </FlexBetween>
        </Box>

        <Form />
      </Box>
      <img
        src={`http://localhost:3001/assets/webVector2.png`}
        height="190px"
        width="1224px"
        style={{
          position: "relative",
          bottom: "0",
          zIndex: "-1",
        }}
      />
      {!token && (
        <img
          src={`http://localhost:3001/assets/registerVec.png`}
          height="470px"
          width="500px"
          style={{
            position: "absolute",
            left: "0",
            bottom: "5rem",
            zIndex: "-1",
          }}
        />
      )}
    </Box>
  );
};

export default LoginPage;
