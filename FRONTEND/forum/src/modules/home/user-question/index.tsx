import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import NewQuestion from "components/home/new-question";
import PostList from "components/home/posts";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getPostByStudentQuestion } from "store/post/action";
import IPost from "types/post";

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function UserQuestionList() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getPostByStudentQuestion());
  }, []);

  const questionSolved = posts.filter((item: IPost) => item.isFinish === true);
  const questionUnsolved = posts.filter(
    (item: IPost) => item.isFinish === false
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper elevation={0}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Unsolved" {...a11yProps(0)} />
                  <Tab label="Solved" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <PostList data={questionUnsolved} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PostList data={questionSolved} />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <NewQuestion />
        </Grid>
      </Grid>
    </>
  );
}
