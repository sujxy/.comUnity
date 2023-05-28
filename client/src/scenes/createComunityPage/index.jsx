import React from "react";
import { Box, useTheme } from "@mui/material";

import Navbar from "scenes/navbar";

import ComunityPanel from "scenes/widgets/comunityWidgets/ComunityPanel";
import CreateWidget from "scenes/widgets/comunityWidgets/CreateWidget";

const CreateComunityPage = () => {
  const { palette } = useTheme();
  return (
    <Box backgroundColor={palette.background.default} width="100vw">
      <Navbar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 3fr",
          gap: "1.5rem",
          height: "100vh",
          alignItems: "normal",

          p: "1rem 5%",
        }}
      >
        <Box gridColumn="1/span 1">
          <ComunityPanel />
        </Box>

        <Box gridColumn="2/span 3" mx="auto">
          <CreateWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateComunityPage;
