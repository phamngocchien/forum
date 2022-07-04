import { Box } from "@mui/system";
import PostList from "components/home/posts";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import { getPostBookmark } from "store/post/action";

export default function Bookmark() {
  const dispatch = useDispatch();
  const { idUser } = useParams<{ idUser: string }>();
  const { posts } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (idUser) {
      dispatch(getPostBookmark(idUser));
    }
  }, [idUser]);

  return (
    <Box className="mr-7">
      <PostList data={posts} />
    </Box>
  );
}
