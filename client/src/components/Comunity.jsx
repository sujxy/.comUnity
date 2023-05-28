import { GroupAddOutlined, GroupRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUserComunity, setPageType } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Comunity = ({ comId, name, description, picturePath }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const { comId: currentComId } = useParams();
  const communities = useSelector((state) => state.user.communities);
  const token = useSelector((state) => state.token);
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isMember = communities.find((comunity) => comunity._id === comId);

  const patchUser = async () => {
    const response = await fetch(
      `http://localhost:3001/comunity/${_id}/${comId}`,
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

  return (
    <FlexBetween>
      <FlexBetween gap="1rem" my="0.5rem">
        <UserImage image={picturePath} size="40px" />
        <Box
          onClick={() => {
            navigate(`/comunity/${comId}`);
            dispatch(setPageType({ pageType: "comunity" }));
            navigate(0);
          }}
        >
          <Typography
            color={comId === currentComId ? primaryLight : main}
            sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
            variant="h5"
          >
            {name}
          </Typography>
          <Typography color={medium} variant="h6">
            {description}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchUser}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isMember ? (
          <GroupRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <GroupAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Comunity;
