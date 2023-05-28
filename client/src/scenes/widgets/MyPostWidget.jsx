import {
  InsertPhotoOutlined,
  VideocamOutlined,
  CalendarMonthOutlined,
  ArticleOutlined,
  SendRounded,
  EditOutlined,
  DeleteOutlineRounded,
} from "@mui/icons-material";

import {
  Divider,
  Typography,
  Box,
  Button,
  InputBase,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import UserTag from "components/UserTag";
import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath, comId = null }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const id = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    if (comId) {
      formData.append("Id", comId);
      formData.append("isComunity", 1);
    } else {
      formData.append("Id", id);
    }

    formData.append("content", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setPost("");
    setImage(null);
    setIsImage(false);
  };

  return (
    <WidgetWrapper sx={{ padding: 0 }}>
      <FlexBetween p="1rem 1.8rem" m="0">
        <UserImage image={picturePath} size="50px" />
        <InputBase
          onChange={(event) => setPost(event.target.value)}
          placeholder="whats new in campus..?"
          value={post}
          sx={{
            backgroundColor: palette.neutral.light,
            width: "80%",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          p="1rem"
          my="1rem"
          mx="auto"
          width="80%"
          borderRadius="1rem "
        >
          <Dropzone
            acceptedFiles=".png,.jpg,.jpeg"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`1px solid ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={palette.neutral.dark}>
                      Add image here
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Box display="grid" gridTemplateColumns="4fr 1fr" m="0.5rem 0 0 ">
        <FlexBetween
          sx={{
            backgroundColor: palette.primary.extraLight,
          }}
          borderRadius="0 0 0 1rem"
          p="0.5rem 1.5rem"
          gap="0.7rem"
          justifyContent="space-around"
          gridColumn="1/span4"
        >
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <InsertPhotoOutlined sx={{ color: palette.neutral.main }} />
            <Typography
              color={palette.neutral.main}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              Photo
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <VideocamOutlined sx={{ color: palette.neutral.main }} />
            <Typography
              color={palette.neutral.main}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              Video
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <CalendarMonthOutlined sx={{ color: palette.neutral.main }} />
            <Typography
              color={palette.neutral.main}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              Event
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ArticleOutlined sx={{ color: palette.neutral.main }} />
            <Typography
              color={palette.neutral.main}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              Article
            </Typography>
          </FlexBetween>
        </FlexBetween>

        <Box
          sx={{
            backgroundColor: palette.primary.dark,
            transition: "background-color 150ms ease-in",
            borderRadius: "0 0 1rem 0",
            textAlign: "center",
            p: "0.25rem",
          }}
          gridColumn="4/span1"
        >
          <Button onClick={handlePost} disabled={!post}>
            <SendRounded sx={{ color: palette.background.alt }} />
          </Button>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
