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
import { addTag } from "store/tag/action";
import ITag from "types/tag";
import { formTagSchema } from "./form-tag.schema";

interface FormUpdateProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function FormCreateTag({ isOpen, onClose }: FormUpdateProps) {
  const dispatch = useDispatch();

  const initialValues = useMemo(
    () => ({
      name: "",
      description: ""
    }),
    []
  );

  function handleSubmit(values: ITag) {
    dispatch(addTag(values));
    onClose();
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: formTagSchema
  });
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex justify-center">Create Tag</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <>
            <TextField
              sx={{ marginTop: "30px" }}
              fullWidth
              error={!!formik.touched.name && !!formik.errors.name}
              label="Name *"
              name="name"
              size="medium"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
            <TextField
              multiline
              rows={5}
              sx={{ marginTop: "30px" }}
              fullWidth
              error={
                !!formik.touched.description && !!formik.errors.description
              }
              label="Description *"
              name="description"
              size="medium"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.description &&
                formik.errors.description &&
                formik.errors.description
              }
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
