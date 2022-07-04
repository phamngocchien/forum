import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import PostList from "components/home/posts";
import {
  CardContent,
  Chip,
  styled,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Tabs
} from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { randomColor } from "components/randomColor";
import { searchAll } from "store/search/action";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

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

export default function ListSearch() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { content } = useParams<{ content: string }>();
  const { data } = useSelector((state: RootState) => state.search);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (content) {
      dispatch(searchAll({ keyword: content }));
    }
  }, [content]);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const questionFilter = data.post.filter(
    (item: any) => item.type === "question"
  );
  const shareFilter = data.post.filter((item: any) => item.type === "share");
  const handleOpenTag = (id: any) => {
    history.push(`/tag/${id}/share`);
  };
  const handleClick = (idUser: string | undefined) => {
    history.push(`/user/${idUser}/post`);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Share" {...a11yProps(0)} />
          <Tab label="Question" {...a11yProps(1)} />
          <Tab label="Tag" {...a11yProps(2)} />
          <Tab label="User" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PostList data={shareFilter} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostList data={questionFilter} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {data.tag.length !== 0 ? (
          <>
            {data.tag.map((item: any) => (
              <>
                <Grid item md={3}>
                  <Item sx={{ height: "178px" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <Chip
                          label={item.name.toLowerCase()}
                          color="primary"
                          onClick={() => handleOpenTag(item._id)}
                        />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box className="description">{item.description}</Box>
                      </Typography>
                    </CardContent>
                  </Item>
                </Grid>
              </>
            ))}
          </>
        ) : (
          <Box className="flex justify-center text-xl">Nothing here!!!</Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {data.user.length !== 0 ? (
          <>
            {data.user.map((item: any) => (
              <>
                <Box key={item._id} className="flex justify-between mr-6">
                  <Box className="flex mb-3">
                    <Avatar
                      alt={item.name}
                      src="Thanglongedu"
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: `#${randomColor}`
                      }}
                      className="mr-5"
                    />
                    <Box>
                      <Box className="flex items-center">
                        <h1 className="text-xl mr-5">{item.name}</h1>
                      </Box>

                      <h2>Email: {item.email}</h2>
                      <h3>Major: {item.major}</h3>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    className="h-6 flex items-center w-32"
                    onClick={() => handleClick(item._id)}
                  >
                    <Box className="px-2">Profile</Box>
                  </Button>
                </Box>
              </>
            ))}
          </>
        ) : (
          <Box className="flex justify-center text-xl">Nothing here!!!</Box>
        )}
      </TabPanel>
    </Box>
  );
}
