import { Box } from "@mui/system";
import PostList from "components/home/posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import { getPostByUserId } from "store/post/action";

export default function UserShare() {
  const { idUser } = useParams<{ idUser: string }>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    if (idUser) {
      dispatch(getPostByUserId(idUser));
    }
  }, []);

  const postfilter = posts.filter((element: any) => element.type === "share");

  return (
    <Box className="mr-7">
      <PostList data={postfilter} />
    </Box>
  );
}
