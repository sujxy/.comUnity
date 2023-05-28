import { Typography, useTheme, Divider } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import Comunity from "components/Comunity";
import { useEffect } from "react";
import { setUserComunity } from "state";
import { useNavigate } from "react-router-dom";

const ComunityWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const communities = useSelector((state) => state.user.communities);
  const token = useSelector((state) => state.token);

  const getUserCommunities = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/communities`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setUserComunity({ communities: data }));
  };
  useEffect(() => {
    getUserCommunities();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        sx={{
          mb: "1rem",
          fontWeight: "bold",
          color: palette.neutral.dark,
        }}
      >
        My Communities
      </Typography>

      {communities?.map((community) => (
        <Comunity
          key={community._id}
          comId={community._id}
          name={community.name}
          description={community.description}
          picturePath={community.picturePath}
        />
      ))}
    </WidgetWrapper>
  );
};

export default ComunityWidget;
