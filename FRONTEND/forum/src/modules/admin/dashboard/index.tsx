import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { socket } from "layout/home";
import { Box } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import StyleIcon from "@mui/icons-material/Style";
import ArticleIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getQuantityOfTag } from "store/tag/action";
import { getQuantityOfUser } from "store/user/action";
import { getQuantityOfFile } from "store/file/action";
import { getAnalyzePost, getAnalyzePostPerMonth } from "store/post/action";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import CircleChart from "./pie-chart";
import LineChartUI from "./line-chart";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const dispatch = useDispatch();
  const [membersOnline, setMembersOnline] = useState([]);
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  const { quatityUser } = useSelector((state: RootState) => state.user);
  const { quantityTag } = useSelector((state: RootState) => state.tag);
  const { quantityFile } = useSelector((state: RootState) => state.file);
  const { analyzePost, analyzePostPerMonth } = useSelector(
    (state: RootState) => state.post
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));

  useEffect(() => {
    socket.on("members_online", (data) => {
      setMembersOnline(data);
    });
  }, [socket, userLoginLocal._id]);

  useEffect(() => {
    dispatch(getQuantityOfUser());
    dispatch(getQuantityOfTag());
    dispatch(getQuantityOfFile());
    dispatch(getAnalyzePost());
    dispatch(getAnalyzePostPerMonth({ year }));
  }, []);
  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    dispatch(getAnalyzePostPerMonth({ year: event.target.value }));
  };

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (analyzePostPerMonth.length !== 0) {
    // eslint-disable-next-line array-callback-return
    analyzePostPerMonth.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      month.map((item2: string, key: number) => {
        if (Number(item.name) === key) {
          return (item.name = item2);
        }
      });
    });
  }
  return (
    <>
      <Box className="flex">
        <Card className="p-3 w-1/4 py-10 mr-6">
          <Box className="font-bold text-center mb-4 inline flex items-center justify-center">
            <p className="mr-2">Members Online</p>
            <p className="w-3 h-3 rounded-full bg-green-400">{""}</p>
          </Box>
          <Box className="text-5xl text-center">{membersOnline?.length}</Box>
        </Card>
        <Card className="p-3 w-1/4 py-10 mr-6">
          <Box className="font-bold text-center mb-4 inline flex items-center justify-center">
            <p className="mr-2">Number of users</p>
            <GroupIcon />
          </Box>
          <Box className="text-5xl text-center">{quatityUser}</Box>
        </Card>
        <Card className="p-3 w-1/4 py-10 mr-6">
          <Box className="font-bold text-center mb-4 inline flex items-center justify-center">
            <p className="mr-2">Number of tags</p>
            <StyleIcon />
          </Box>
          <Box className="text-5xl text-center">{quantityTag}</Box>
        </Card>
        <Card className="p-3 w-1/4 py-10 ">
          <Box className="font-bold text-center mb-4 inline flex items-center justify-center">
            <p className="mr-2">Number of documents</p>
            <ArticleIcon />
          </Box>
          <Box className="text-5xl text-center">{quantityFile}</Box>
        </Card>
      </Box>

      <Card className="mt-6 h-4/6 p-5">
        <Box className="font-bold text-2xl">Posts</Box>
        <Box className="flex">
          <Box className="w-1/3">
            <p className="mb-2 text-center font-bold">
              Number of posts:{" "}
              {analyzePost.reduce((a: number, b: any) => a + b.value, 0)}
            </p>
            <Box className="flex justify-center mt-10">
              <CircleChart data={analyzePost} />
            </Box>
            <Box className="flex items-center justify-center">
              <Box className="flex items-center mr-3">
                <Box
                  className="h-8 w-12 mr-1 rounded-lg"
                  sx={{ backgroundColor: "#116466" }}
                >
                  {" "}
                </Box>
                <p className="font-bold">Share</p>
              </Box>
              <Box className="flex items-center mr-3">
                <Box
                  className="h-8 w-12 mr-1 rounded-lg"
                  sx={{ backgroundColor: "#D9B08C" }}
                >
                  {" "}
                </Box>
                <p className="font-bold">Question</p>
              </Box>
              <Box className="flex items-center mr-3">
                <Box
                  className="h-8 w-12 mr-1 rounded-lg"
                  sx={{ backgroundColor: "#FFCB9A" }}
                >
                  {" "}
                </Box>
                <p className="font-bold">Job</p>
              </Box>
              <Box className="flex items-center mr-3">
                <Box
                  className="h-8 w-12 mr-1 rounded-lg"
                  sx={{ backgroundColor: "#D1E8E2" }}
                >
                  {" "}
                </Box>
                <p className="font-bold">Notification</p>
              </Box>
            </Box>
          </Box>
          <Box className="w-2/3">
            <Box className="flex justify-around items-center mb-2">
              <p className=" text-center font-bold">
                Number of posts per month
              </p>
              <Box className="flex items-center">
                <p className=" font-bold mr-2">Year:</p>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={year}
                    onChange={handleChange}
                    label="Year"
                  >
                    <MenuItem value={"2021"}>2021</MenuItem>
                    <MenuItem value={"2022"}>2022</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box className="flex justify-center">
              <LineChartUI data={analyzePostPerMonth} />
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
