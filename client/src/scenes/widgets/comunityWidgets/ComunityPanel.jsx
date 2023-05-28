import { Button, Typography, useTheme, Divider } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import Comunity from "components/Comunity";
import { useEffect } from "react";
import { setUserComunity, setComunitys } from "state";
import { useNavigate } from "react-router-dom";

const ComunityPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const _id = useSelector((state) => state.user._id);
  const isCreate = useSelector((state) => state.isCreate);
  const communities = useSelector((state) => state.user.communities);
  const token = useSelector((state) => state.token);
  const comunitys = useSelector((state) => state.allComunitys);

  const getUserCommunities = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/communities`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setUserComunity({ communities: data }));
  };

  const getAllCommunities = async () => {
    const response = await fetch(`http://localhost:3001/comunity`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setComunitys({ comunitys: data }));
  };

  useEffect(() => {
    getUserCommunities();
    getAllCommunities();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Button
        onClick={() => navigate("/create")}
        sx={{
          backgroundColor: palette.primary.main,
          width: "100%",
          p: "1rem",
          my: "1rem",
          "&:hover": {
            backgroundColor: palette.primary.light,
          },
        }}
        startIcon={<GroupAdd />}
        variant="contained"
      >
        create
      </Button>

      <Divider />
      <Typography
        sx={{
          my: "1rem",
          variant: "h5",
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
      <Divider />
      <Typography
        sx={{
          my: "1rem",
          variant: "h5",
          fontWeight: "bold",
          color: palette.neutral.dark,
        }}
      >
        Explore
      </Typography>
      {comunitys?.map(({ _id, name, description, picturePath }) => (
        <Comunity
          key={_id}
          comId={_id}
          name={name}
          description={description}
          picturePath={picturePath}
        />
      ))}
    </WidgetWrapper>
  );
};

export default ComunityPanel;
