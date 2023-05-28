import { Box, Typography, useTheme } from "@mui/material";
import Buddy from "components/Buddy";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";
import { useEffect } from "react";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const buddies = useSelector((state) => state.user.buddies);

  const getBuddies = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/buddies`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ buddies: data }));
  };

  useEffect(() => {
    getBuddies();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper m="2rem 0">
      <Typography
        variant="h5"
        color={palette.neutral.dark}
        fontWeight="bold"
        sx={{ mb: "1.5rem" }}
      >
        Buddies
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {buddies?.map((buddy) => (
          <Buddy
            key={buddy._id}
            buddyId={buddy._id}
            name={`${buddy.firstName} ${buddy.lastName}`}
            description={buddy.description}
            department={buddy.department}
            userPicturePath={buddy.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
