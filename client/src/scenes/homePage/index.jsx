import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import FlexBetween from "components/FlexBetween";
import AdWidget from "scenes/widgets/AdWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ComunityWidget from "scenes/widgets/ComunityWidget";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();
  return (
    <Box backgroundColor={palette.background.default} width="100vw">
      <Navbar />
      <FlexBetween
        sx={{
          height: "auto",
          alignItems: "normal",
          p: "1rem 5%",
        }}
      >
        <Box flexBasis={isNonMobileScreen ? "27%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "40%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} comId={null} />
          <PostsWidget userId={_id} isProfile={false} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="27%">
            <AdWidget />
            <FriendListWidget userId={_id} />
            <ComunityWidget userId={_id} />
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default HomePage;
