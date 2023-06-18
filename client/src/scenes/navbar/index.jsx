import React from "react";
import { useState } from "react";
import { setPageType } from "state";

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  HomeRounded,
  Groups2Rounded,
  DarkModeRounded,
  LightModeRounded,
  MailRounded,
  PersonRounded,
  SearchRounded,
  Menu,
  Close,
  NotificationsRounded,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageType = useSelector((state) => state.pageType);
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const primaryAccent = theme.palette.primary.main;
  const alt = theme.palette.background.alt;

  return (
    <FlexBetween padding="0.7rem 5%" backgroundColor={alt}>
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
          color={primaryAccent}
          fontWeight="400"
          ml="-5px"
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => navigate("/home")}
        >
          unity
        </Typography>
      </FlexBetween>

      {/* navigator */}
      {isNonMobileScreens ? (
        <FlexBetween gap="4rem" ml="145px">
          <IconButton
            onClick={() => {
              navigate("/home");
              dispatch(setPageType({ pageType: "home" }));
            }}
          >
            <HomeRounded
              sx={{
                fontSize: "22px",
                color: pageType === "home" ? primaryAccent : dark,
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => {
              navigate(`/create`);
              dispatch(setPageType({ pageType: "comunity" }));
            }}
          >
            <Groups2Rounded
              sx={{
                fontSize: "22px",
                color: pageType === "comunity" ? primaryAccent : dark,
              }}
            />
          </IconButton>

          <IconButton>
            <NotificationsRounded sx={{ fontSize: "22px" }} />
          </IconButton>

          <IconButton
            onClick={() => {
              navigate("/messages");
              dispatch(setPageType({ pageType: "message" }));
            }}
          >
            <MailRounded
              sx={{
                fontSize: "22px",
                color: pageType === "message" ? primaryAccent : dark,
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => {
              navigate(`/profile/${user._id}`);
              dispatch(setPageType({ pageType: "profile" }));
            }}
          >
            <PersonRounded
              sx={{
                fontSize: "22px",
                color: pageType === "profile" ? primaryAccent : dark,
              }}
            />
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
          <Menu />
        </IconButton>
      )}

      {/* mobile navigation menu */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
              <Close />
            </IconButton>
          </Box>

          {/* menu items */}
          <FlexBetween
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="5rem"
          >
            <IconButton
              onClick={() => {
                navigate("/home");
                dispatch(setPageType({ pageType: "home" }));
              }}
            >
              <HomeRounded sx={{ fontSize: "22px" }} />
            </IconButton>

            <IconButton
              onClick={() => {
                navigate(`/create`);
                dispatch(setPageType({ pageType: "comunity" }));
              }}
            >
              <Groups2Rounded sx={{ fontSize: "22px" }} />
            </IconButton>

            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "dark" ? (
                <DarkModeRounded sx={{ fontSize: "22px" }} />
              ) : (
                <LightModeRounded sx={{ fontSize: "22px" }} />
              )}
            </IconButton>

            <IconButton
              onClick={() => {
                navigate("/messages");
                dispatch(setPageType({ pageType: "message" }));
              }}
            >
              <MailRounded sx={{ fontSize: "22px" }} />
            </IconButton>

            <IconButton
              onClick={() => {
                navigate(`/profile/${user._id}`);
                dispatch(setPageType({ pageType: "profile" }));
              }}
            >
              <PersonRounded sx={{ fontSize: "22px" }} />
            </IconButton>
          </FlexBetween>
        </Box>
      )}

      {/* search tab and button */}
      {isNonMobileScreens && (
        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "dark" ? (
              <DarkModeRounded sx={{ fontSize: "22px" }} />
            ) : (
              <LightModeRounded sx={{ fontSize: "22px" }} />
            )}
          </IconButton>
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
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default Navbar;
