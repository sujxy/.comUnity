import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { setUserComunity } from "state";

const ProfilePanel = ({ comunity }) => {
  // const [comunity, setComunity] = useState(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  // const getComunity = async () => {
  //   const res = await fetch(`http://localhost:3000/comunity/${comId}`, {
  //     method: "GET",
  //     header: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const data = await res.json();
  //   setComunity(data);
  // };

  // useEffect(() => {
  //   getComunity();
  // }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const patchUser = async () => {
    const response = await fetch(
      `http://localhost:3001/comunity/${_id}/${comunity._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setUserComunity({ communities: data }));
  };

  if (!comunity) return null;
  const { name, description, picturePath, coverPath, bio, members } = comunity;

  return (
    <WidgetWrapper>
      <Box
        sx={{
          width: "100%",
          m: "0",
        }}
      >
        <img
          style={{ margin: 0, borderRadius: "1rem 1rem 0 0 " }}
          width="100%"
          height="auto"
          alt="cover"
          src={`http://localhost:3001/assets/${coverPath}`}
        />

        <FlexBetween my="1.5rem" p="0 1rem">
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} size="70px" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Typography variant="h3" sx={{ color: palette.neutral.dark }}>
                {name}
              </Typography>
              <Typography variant="h4" sx={{ color: palette.neutral.medium }}>
                {description}
              </Typography>
            </Box>
          </FlexBetween>
          <FlexBetween gap="1rem">
            <Typography variant="h5" sx={{ color: palette.neutral.medium }}>
              {members.length}
            </Typography>

            <Button
              variant="filled"
              sx={{
                backgroundColor: palette.primary.main,
                "&:hover": {
                  backgroundColor: palette.primary.light,
                },
              }}
              onClick={patchUser}
            >
              {members.includes(_id) ? "leave" : "join"}
            </Button>
          </FlexBetween>
        </FlexBetween>
      </Box>
      <Divider />
      <Box my="1rem" p="1.2rem">
        <Typography variant="h3" sx={{ color: palette.neutral.dark }}>
          About
        </Typography>
        <Typography sx={{ color: palette.neutral.medium }}>{bio}</Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default ProfilePanel;
