import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useEffect } from "react";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { findPostApproval } from "store/post/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import PostListTable from "components/admin/post-list-table";

export default function ApprovalPost() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.postApproval);
  const initialValues = useMemo(
    () => ({
      category: "",
      type: "",
      status: false
    }),
    []
  );

  useEffect(() => {
    const item = { status: "false" };
    dispatch(findPostApproval(item));
  }, []);

  function handleSubmit(values: any) {
    dispatch(findPostApproval(values));
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });
  const sortData = posts.sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return (
    <Box className="">
      <Card className="flex items-center justify-between px-5 mb-5">
        <Box className="font-bold">POST APPROVAL</Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="flex items-center">
            <FormControl sx={{ m: 2, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={formik.values.category}
                label="Category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              >
                <MenuItem value={"student"}>Student</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={formik.values.type}
                label="Type"
                name="type"
                onChange={formik.handleChange}
              >
                <MenuItem value={"question"}>Question</MenuItem>
                <MenuItem value={"share"}>Share</MenuItem>
              </Select>
            </FormControl>
            <Button className="h-12 w-12" type="submit">
              <SearchIcon fontSize="large" />
            </Button>
          </Box>
        </form>
      </Card>
      <Box>
        <PostListTable data={sortData} mode="approval" />
      </Box>
    </Box>
  );
}
