import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { addTag, editTag } from "store/tag/action";
import { Transition } from "components/transition-dialog";

interface TagProps {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
}
export default function FormTag({ mode, isOpen, onClose }: TagProps) {
  const dispatch = useDispatch();
  const tagDetails = useSelector((state: RootState) => state.tag.tagDetails);

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        name: tagDetails.name,
        description: tagDetails.description
      };
    }
    return {
      name: "",
      description: ""
    };
  }, [tagDetails, mode]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("Please enter tag"),
      description: yup.string().required("Please enter description")
    }),
    onSubmit: (values: any, { resetForm }) => {
      if (mode === "create") {
        dispatch(addTag(values));
        onClose();
        resetForm();
      } else if (mode === "edit") {
        dispatch(editTag(tagDetails._id, values));
        onClose();
        resetForm();
      }
    }
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
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{mode === "edit" ? "Edit Tag" : "Add Tag"}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ minWidth: 550, marginTop: 1 }}>
            <TextField
              id="name"
              error={!!formik.touched.name && !!formik.errors.name}
              label="Name"
              name="name"
              variant="outlined"
              type="text"
              InputLabelProps={{ shrink: true }}
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
            <Box className="h-4"> </Box>
            <TextField
              multiline
              rows={5}
              error={
                !!formik.touched.description && !!formik.errors.description
              }
              id="description"
              label="Description"
              name="description"
              variant="outlined"
              type="text"
              InputLabelProps={{ shrink: true }}
              value={formik.values.description}
              onChange={formik.handleChange}
              helperText={
                formik.touched.description &&
                formik.errors.description &&
                formik.errors.description
              }
            />
          </FormControl>
          {/* {error && (
          <Box className="text-md text-red-500 italic">
          This tag already exists
          </Box>
        )} */}
        </DialogContent>
        <DialogActions className="mr-2">
          <Button type="submit">{mode === "edit" ? "Edit" : "Add"}</Button>
          <Button onClick={onClose}>CANCEl</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
