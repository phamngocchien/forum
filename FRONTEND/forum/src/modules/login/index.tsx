import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import "./login.css";
import logo from "assets/LogoTLU.png";
import { useHistory } from "react-router";
import { RootState } from "store";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { login } from "store/user/action";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "./login.schema";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, userLogin, loading } = useSelector(
    (state: RootState) => state.user
  );
  const isCheckLogin = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (isCheckLogin) {
      history.replace("/");
    }
  }, [isCheckLogin, userLogin]);

  const handleSubmit = (values: any) => {
    dispatch(login(values));
  };

  const initialValues = useMemo(
    () => ({
      msv: "",
      password: ""
    }),
    []
  );
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: handleSubmit
  });
  return (
    <Grid>
      <form onSubmit={formik.handleSubmit}>
        <Box className="container-page">
          <Box className="paper">
            <Box className="w-48 rounded-full mb-9 mx-auto">
              <CardMedia component="img" image={logo} alt="TLU" />
            </Box>
            <h2 className="text-3xl text-center font-bold">Sign In</h2>
            <Box className="my-10">
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">
                  <Box className="text-xl">User name</Box>
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  name="msv"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.msv}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {formik.touched.msv && formik.errors.msv ? (
                <span className="error pt-10">{formik.errors.msv}</span>
              ) : null}
            </Box>
            <Box className="my-10">
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">
                  <Box className="text-xl ">Password</Box>
                </InputLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {formik.touched.password && formik.errors.password ? (
                <span className="error">{formik.errors.password}</span>
              ) : null}
            </Box>

            <Box className="flex justify-between items-center mb-2">
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
              <Typography>
                <Link to="/" href="#" className="mt-2">
                  Forgot password ?
                </Link>
              </Typography>
            </Box>
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              className="btn relative"
            >
              Sign in
              {loading && (
                <CircularProgress
                  className="absolute right-3"
                  size={20}
                  sx={{ color: "white" }}
                />
              )}
            </Button>

            {error && <Box className="text-center error mt-5">{error}</Box>}
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default LoginForm;
