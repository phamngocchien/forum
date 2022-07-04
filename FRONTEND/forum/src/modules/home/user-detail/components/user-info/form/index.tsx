import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { Transition } from "components/transition-dialog";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { editAUser } from "store/user/action";
import IUser from "types/user";
import "../user-info.css";
import {
  nameSchema,
  githubSchema,
  facebookSchema,
  passwordSchema
} from "../user-info.schema";

interface FormUpdateProps {
  mode: string;
  isOpen: boolean;
  onClose: () => void;
  data: IUser;
}
export default function FormUpdate({
  mode,
  isOpen,
  onClose,
  data
}: FormUpdateProps) {
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");

  const initialValues = useMemo(() => {
    if (mode === "name") {
      return {
        name: data.name
      };
    }
    if (mode === "github") {
      return {
        github: data.github
      };
    }
    if (mode === "facebook") {
      return {
        facebook: data.facebook
      };
    }
    if (mode === "password") {
      return {
        password: "",
        confirmPassword: ""
      };
    }
    return {
      name: "",
      facebook: "",
      github: "",
      password: "",
      confirmPassword: ""
    };
  }, [data, mode]);

  const validation = (field: string) => {
    switch (field) {
      case "name":
        return nameSchema;
      case "github":
        return githubSchema;
      case "facebook":
        return facebookSchema;
      case "password":
        return passwordSchema;
      default:
        break;
    }
  };

  function handleSubmit(values: any) {
    if (mode === "name") {
      const value = { ...data, name: values.name };
      delete value._id;
      dispatch(editAUser(userLogin._id, value));
      onClose();
    }
    if (mode === "github") {
      const value = { ...data, github: values.github };
      delete value._id;
      dispatch(editAUser(userLogin._id, value));
      onClose();
    }
    if (mode === "facebook") {
      const value = { ...data, facebook: values.facebook };
      delete value._id;
      dispatch(editAUser(userLogin._id, value));
      onClose();
    }
    if (mode === "password") {
      const value = { ...data, password: values.password };
      delete value._id;
      dispatch(editAUser(userLogin._id, value));
      onClose();
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: validation(mode)
  });
  return (
    <Dialog
      maxWidth="lg"
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex justify-center">UPDATE</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {mode === "name" && (
            <TextField
              fullWidth
              error={!!formik.touched.name && !!formik.errors.name}
              label="Name *"
              name="name"
              size="medium"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
          )}
          {mode === "github" && (
            <TextField
              fullWidth
              error={!!formik.touched.github && !!formik.errors.github}
              label="Github *"
              name="github"
              size="medium"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formik.values.github}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={
                formik.touched.github &&
                formik.errors.github &&
                formik.errors.github
              }
            />
          )}
          {mode === "facebook" && (
            <TextField
              fullWidth
              error={!!formik.touched.facebook && !!formik.errors.facebook}
              label="Facebook *"
              name="facebook"
              size="medium"
              type="text"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formik.values.facebook}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={
                formik.touched.facebook &&
                formik.errors.facebook &&
                formik.errors.facebook
              }
            />
          )}
          {mode === "password" && (
            <>
              <TextField
                fullWidth
                error={!!formik.touched.password && !!formik.errors.password}
                label="Password *"
                name="password"
                size="medium"
                type="password"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                }
              />
              <TextField
                sx={{ marginTop: "30px" }}
                fullWidth
                error={
                  !!formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
                label="Confirm Password *"
                name="confirmPassword"
                size="medium"
                type="password"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
