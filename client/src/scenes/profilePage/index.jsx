import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { useMediaQuery, Typography, Box, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Navbar from "scenes/navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const { userId } = useParams();
  const isNonMobileScreen = useMediaQuery("(min-width : 1000px) ");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box backgroundColor={palette.background.default} width="100vw">
      <Navbar />
      <FlexBetween
        sx={{
          height: "100%",
          alignItems: "normal",
          p: "1rem 5%",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Box flexBasis={isNonMobileScreen ? "27%" : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
          ></UserWidget>
          <FriendListWidget userId={userId} />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "40%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile={true} isComunity={false} />
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default ProfilePage;
