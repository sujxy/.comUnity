import react from "react";
import FlexBetween from "components/FlexBetween";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode);
  return (
    <Box sx={{ zIndex: "-1" }}>
      {/* navbar */}
      <FlexBetween
        p="0.7rem 7%"
        sx={{
          boxShadow: "0px 12px 26px rgba(205, 205, 205, 0.22)",
          zIndex: "1",
          position: "relative",
        }}
      >
        <FlexBetween gap="0.3rem" mt="-10px">
          <Typography
            fontFamily={theme.typography.com}
            fontWeight="bold"
            fontSize="clamp(0.7rem,1.7rem,2rem)"
            mt="4.5px"
            color={mode === "dark" ? "white" : "black"}
          >
            .com
          </Typography>
          <Typography
            fontFamily={theme.typography.unity}
            fontSize="clamp(1.3rem,2.3rem,2.6rem)"
            color={palette.primary.main}
            fontWeight="400"
            ml="-5px"
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => navigate("/home")}
          >
            unity
          </Typography>
        </FlexBetween>
        <FlexBetween gap="4rem">
          <Typography
            onClick={() => navigate("/auth")}
            sx={{
              fontFamily: "Comfortaa",
              fontWeight: "light",
              fontSize: "22px",
              "&:hover": { color: palette.primary.main, cursor: "pointer" },
            }}
          >
            Login
          </Typography>
          <Typography
            onClick={() => navigate("/auth")}
            sx={{
              fontFamily: "Comfortaa",
              fontWeight: "light",
              fontSize: "22px",
              "&:hover": { color: palette.primary.main, cursor: "pointer" },
            }}
          >
            Signup
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comfortaa",
              fontWeight: "light",
              fontSize: "22px",
              "&:hover": { color: palette.primary.main, cursor: "pointer" },
            }}
          >
            About
          </Typography>
        </FlexBetween>
      </FlexBetween>

      <img
        src={`http://localhost:3001/assets/webVector1.png`}
        height="218.98px"
        width="558.33px"
        style={{
          position: "absolute",
          left: "880px",
          top: "68px",
          zIndex: "0",
        }}
      />

      <FlexBetween sx={{ p: "0 8%", mt: "2rem" }} gap="1rem">
        <Box width="42%">
          <Typography
            sx={{
              fontFamily: "Noto Serif Georgian",
              fontSize: "3.8rem",
              color: "black",
            }}
          >
            Your old college,
          </Typography>
          <Typography
            sx={{
              fontFamily: "Noto Serif Georgian",
              fontSize: "3.8rem",
              color: "black",
            }}
          >
            More Social .
          </Typography>
          <Box display="flex" justifyContent="flex-start" gap="1rem" mt="2rem ">
            <Button
              style={{ textTransform: "none" }}
              sx={{
                backgroundColor: palette.primary.main,
                color: "white",
                borderRadius: "21px",
                fontSize: "24px",
                fontFamily: "Comfortaa",
                p: "0 1rem",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: palette.primary.light,
                },
              }}
            >
              Join now
            </Button>
            <Typography
              sx={{
                fontFamily: "Comfortaa",
                fontSize: "26px",
                fontWeight: "light",
                "&:hover": { color: palette.primary.main, cursor: "pointer" },
              }}
            >
              find more
            </Typography>
          </Box>
        </Box>
        <img
          src="http://localhost:3001/assets/illustration1.png"
          width="600px"
          height="100%"
          style={{
            zIndex: "1",
          }}
        />
      </FlexBetween>
      <Box>
        <FlexBetween gap="1rem" p="0 8%">
          <img
            src="http://localhost:3001/assets/illustration2.png"
            height="100%"
            width="600px"
            style={{
              zIndex: "1",
            }}
          />
          <Box display="flex" width="40%" gap="0.5rem" sx={{ zIndex: "1" }}>
            <img
              src="http://localhost:3001/assets/line.png"
              height="100%"
              width="2%"
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              Completely transform the way you interact with your college
              buddies with a dedicated social platform exclusively for your
              college !
            </Typography>
          </Box>
        </FlexBetween>
        <img
          src={`http://localhost:3001/assets/webVector2.png`}
          height="190px"
          width="1224px"
          style={{
            position: "relative",

            zIndex: "0",
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
