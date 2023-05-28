import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({
  userId,
  isProfile = false,
  isComunity = false,
  comId,
}) => {
  const dispatch = useDispatch();

  const feedPosts = useSelector((state) => state.allPosts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const allPosts = await response.json();

    dispatch(setPosts({ posts: allPosts }));
  };
  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const allPosts = await response.json();

    dispatch(setPosts({ posts: allPosts }));
  };

  const getComPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/comunity/${comId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const allPosts = await response.json();
    dispatch(setPosts({ posts: allPosts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else if (isComunity) {
      getComPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {feedPosts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          department,
          description,
          content,
          picturePath,
          userPicturePath,
          upvotes,
          comments,
          saves,
          isComunity,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            department={department}
            description={description}
            content={content}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            upvotes={upvotes}
            comments={comments}
            saves={saves}
            isComunity={isComunity}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
