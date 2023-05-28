import {
  Eject,
  EjectOutlined,
  ModeCommentOutlined,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Buddy from "components/Buddy";
import WidgetWrapper from "components/WidgetWrapper";
import Comunity from "components/Comunity";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useState } from "react";

const PostWidget = ({
  postId,
  userId,
  name,
  department,
  description,
  content,
  picturePath,
  userPicturePath,
  upvotes,
  comments,
  saves,
  isComunity,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isUpvoted = Boolean(upvotes[loggedInUserId]);
  const upvotesCount = Object.keys(upvotes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchUpvote = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/upvote`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    const data = await response.json();
    dispatch(setPost({ post: data }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      {isComunity ? (
        <Comunity
          comId={userId}
          name={name}
          description={description}
          picturePath={userPicturePath}
        />
      ) : (
        <Buddy
          buddyId={userId}
          name={name}
          department={department}
          description={description}
          userPicturePath={userPicturePath}
        />
      )}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {content}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt={`${name}'s post`}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween>
            <IconButton onClick={patchUpvote}>
              {isUpvoted ? (
                <Eject sx={{ color: primary }} />
              ) : (
                <EjectOutlined />
              )}
            </IconButton>
            <Typography color={palette.neutral.medium}>
              {upvotesCount}
            </Typography>
          </FlexBetween>

          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ModeCommentOutlined color={main} />
            </IconButton>
            <Typography color={palette.neutral.medium}>
              {comments.length}
            </Typography>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        <IconButton onClick={() => setIsBookmark(!isBookmark)}>
          {isBookmark ? (
            <BookmarkOutlined sx={{ color: primary }} />
          ) : (
            <BookmarkBorderOutlined color={main} />
          )}
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.25rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: ".25rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
