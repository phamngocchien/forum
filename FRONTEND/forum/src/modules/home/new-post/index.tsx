import { Grid, Paper } from "@mui/material";
import NewQuestion from "components/home/new-question";
import PostList from "components/home/posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getPostByNewest } from "store/post/action";

export default function NewPostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    dispatch(getPostByNewest());
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper elevation={0}>
            <PostList data={posts} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <NewQuestion />
        </Grid>
      </Grid>
    </>
  );
}
