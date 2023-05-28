import { Typography, useTheme, Divider } from "@mui/material";

import WidgetWrapper from "components/WidgetWrapper";

const AdWidget = () => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper textAlign="center">
      <img
        width="100%"
        height="auto"
        sx={{ borderRadius: "0.75rem" }}
        alt="advertisement"
        src="http://localhost:3001/assets/cta.png"
      />
      <Divider mt="1rem" />
      <Typography
        variant="h5"
        sx={{
          color: palette.primary.main,
          mt: "0.25rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        Join Now
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
