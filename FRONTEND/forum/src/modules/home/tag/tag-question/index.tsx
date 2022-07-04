import { Grid, Paper } from "@mui/material";
import PostList from "components/home/posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import { getPostByTagId } from "store/post/action";

export default function TagPostQuestion() {
  const dispatch = useDispatch();
  const { idTag } = useParams<{ idTag: string }>();
  const posts = useSelector((state: RootState) => state.post.postTag);

  useEffect(() => {
    const item = {
      idTag,
      type: "question"
    };
    dispatch(getPostByTagId(item));
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <PostList data={posts} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
