import {
  Box,
  Typography,
  Divider,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import {
  WorkRounded,
  SchoolRounded,
  RemoveRedEyeRounded,
  ManageAccountsRounded,
  EditRounded,
} from "@mui/icons-material";

import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserTag from "components/UserTag";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setLogout } from "state";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isLogout, setIsLogout] = useState(null);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    collegeName,
    department,
    description,
    bio,
    impressions,
  } = user;

  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem" onClick={() => navigate(`/profile/${userId}`)}>
          <UserImage image={picturePath} />
          <Box display="flex" flexDirection="column" p="1px">
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography variant="h5" color={medium}>
              {description}
            </Typography>
          </Box>
          <UserTag department={department} />
        </FlexBetween>
        <IconButton onClick={() => setIsLogout(!isLogout)}>
          <ManageAccountsRounded sx={{ color: dark }} />
        </IconButton>
      </FlexBetween>
      {/* logout button */}
      {isLogout && (
        <Box textAlign="center" my="0.6rem">
          <Divider />
          <Button
            onClick={() => dispatch(setLogout())}
            sx={{ mt: "0.40rem", "&:hover": { cursor: "pointer" } }}
          >
            <Typography sx={{ color: "red" }}>log out</Typography>
          </Button>
        </Box>
      )}
      <Divider />
      {/* row 2 */}
      <Box p="1rem 0 0.8rem" mt="-12px">
        <Box display="flex" alignItems="center" gap="1rem" m="0.5rem 0 0.6rem">
          <SchoolRounded fontSize="medium" sx={{ color: dark }} />
          <Typography sx={{ color: main }}>{collegeName}</Typography>
        </Box>

        <Divider />
        <Box display="flex" alignItems="center" gap="1rem" m="0.6rem 0 0.7rem">
          <Typography fontWeight="bold" sx={{ color: dark }}>
            bio
          </Typography>
          <Typography sx={{ color: main }}>
            bio is overrated ,work is underrated
          </Typography>
          <EditRounded fontSize="medium" sx={{ color: dark }} />
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" gap="1rem" m="0.6rem 0 0.6rem">
          <RemoveRedEyeRounded fontSize="medium" sx={{ color: dark }} />
          <Typography sx={{ color: main }}>{impressions}</Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
