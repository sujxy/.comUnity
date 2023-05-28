import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import FlexBetween from "components/FlexBetween";
import ComunityPanel from "scenes/widgets/comunityWidgets/ComunityPanel";
import CreateWidget from "scenes/widgets/comunityWidgets/CreateWidget";
import ProfilePanel from "scenes/widgets/comunityWidgets/ProfilePanel";
import MembersPanel from "scenes/widgets/comunityWidgets/MembersPanel";

const ComunityPage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const [comunity, setComunity] = useState(null);

  const { comId } = useParams();

  const getComunity = async () => {
    const response = await fetch(`http://localhost:3001/comunity/${comId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setComunity(data);
  };

  useEffect(() => {
    getComunity();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!comunity) return null;

  return (
    <Box backgroundColor={palette.background.default} width="100vw">
      <Navbar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 3fr",
          gap: "1.5rem",
          height: "auto",
          alignItems: "normal",

          p: "1rem 5%",
        }}
      >
        <Box gridColumn="1/span 1">
          <ComunityPanel />
        </Box>

        <Box gridColumn="2/span 3">
          <ProfilePanel comunity={comunity} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.5fr 2.5fr",
              gap: "1rem",
              my: " 1rem",
            }}
          >
            <Box gridColumn="1/span 1">
              <MembersPanel comId={comunity._id} members={comunity.members} />
            </Box>

            <Box gridColumn="2/span 2">
              <MyPostWidget
                comId={comunity._id}
                picturePath={comunity.picturePath}
              />
              <PostsWidget
                isProfile={false}
                isComunity={true}
                comId={comunity._id}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComunityPage;
