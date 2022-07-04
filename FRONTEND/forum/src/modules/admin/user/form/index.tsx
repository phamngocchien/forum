import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { PATH_ADMIN_USER } from "routes/routes.paths";
import { RootState } from "store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { addUser, getUserId, editUser } from "store/user/action";
import { userSchema } from "./user-form.schema";

interface UserFormProps {
  mode: "create" | "edit";
}

export default function UserForm({ mode }: UserFormProps) {
  const dispatch = useDispatch();
  const { userDetail, loading } = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getUserId(id));
    }
  }, [id]);

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        name: Object(userDetail).name,
        msv: Object(userDetail).msv,
        major: Object(userDetail).major,
        role: Object(userDetail).role
      };
    }
    return {
      name: "",
      msv: "",
      role: "",
      major: ""
    };
  }, [userDetail, mode]);

  function handleSubmit(values: any) {
    const email = `${values.msv}@thanglong.edu.vn`;
    const submitData = {
      name: values.name,
      msv: values.msv,
      email,
      password: "123456",
      role: values.role,
      major: values.major,
      facebook: "",
      github: "",
      follow: [],
      notification: []
    };

    if (mode === "create") {
      dispatch(addUser(submitData));
      if (loading === false) {
        history.push(PATH_ADMIN_USER);
      }
    }
    if (mode === "edit") {
      dispatch(editUser(id, submitData));
      if (loading === false) {
        history.push(PATH_ADMIN_USER);
      }
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: userSchema
  });

  return (
    <>
      <Card className="px-5 mb-5 flex items-center justify-between">
        <Link to={PATH_ADMIN_USER}>
          <Button className="h-10">
            <ArrowBackIcon />
          </Button>
        </Link>
        <Box className="font-bold py-8 mr-10">
          {mode === "create" ? "CREATE USER" : "EDIT USER"}
        </Box>
      </Card>
      <Paper sx={{ p: 3 }}>
        <Box className="font-bold mb-6 ml-64">USER INFORMATION</Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid container item lg={5} md={7}>
              <Grid container spacing={3}>
                <Grid item lg={6} md={6}>
                  <TextField
                    fullWidth
                    error={!!formik.touched.name && !!formik.errors.name}
                    label="Name *"
                    name="name"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.name &&
                      formik.errors.name &&
                      formik.errors.name
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6}>
                  <TextField
                    fullWidth
                    error={!!formik.touched.msv && !!formik.errors.msv}
                    label="Student Code *"
                    name="msv"
                    placeholder="A31946"
                    size="small"
                    variant="outlined"
                    value={formik.values.msv}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={
                      formik.touched.msv &&
                      formik.errors.msv &&
                      formik.errors.msv
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      select
                      helperText={
                        formik.touched.major &&
                        formik.errors.major &&
                        formik.errors.major
                      }
                      id="demo-controlled-open-select"
                      value={formik.values.major}
                      label="Major *"
                      name="major"
                      error={!!formik.touched.major && !!formik.errors.major}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={"Computer Science"}>
                        Computer Science
                      </MenuItem>
                      <MenuItem value={"Information Technology"}>
                        Information Technology
                      </MenuItem>
                      <MenuItem
                        value={"Data Communication and Computer Network"}
                      >
                        Data Communication and Computer Network
                      </MenuItem>
                      <MenuItem value={"Network Technology"}>
                        Network Technology
                      </MenuItem>
                      <MenuItem value={"Software Engineering"}>
                        Software Engineering
                      </MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      select
                      id="demo-controlled-open-select"
                      value={formik.values.role}
                      label="Role *"
                      name="role"
                      error={!!formik.touched.role && !!formik.errors.role}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.role &&
                        formik.errors.role &&
                        formik.errors.role
                      }
                    >
                      <MenuItem value={"student"}>Student</MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  item
                  lg={12}
                  spacing={1}
                >
                  <Grid item>
                    <Link to={PATH_ADMIN_USER}>
                      <Button type="button" disableElevation variant="outlined">
                        Cancel
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      disableElevation
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
