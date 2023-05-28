import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPageType } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import UserTag from "./UserTag";

const Buddy = ({ buddyId, name, description, department, userPicturePath }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageType = useSelector((state) => state.pageType);
  const { _id } = useSelector((state) => state.user);
  const buddies = useSelector((state) => state.user.buddies);
  const token = useSelector((state) => state.token);
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isBuddy = buddies.find((buddy) => buddy._id === buddyId);

  const patchBuddy = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${buddyId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ buddies: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="50px" />
        <Box
          onClick={() => {
            navigate(`/profile/${buddyId}`);
            dispatch(setPageType({ pageType: "profile" }));
            navigate(0);
          }}
        >
          <Typography
            color={main}
            sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
            variant="h4"
          >
            {name}
          </Typography>
          <Typography color={medium} variant="h5">
            {description}
          </Typography>
        </Box>
        <UserTag department={department} />
      </FlexBetween>
      <IconButton
        onClick={patchBuddy}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isBuddy ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Buddy;
