import {
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
import { Transition } from "components/transition-dialog";
import { addDocType, updateDocType } from "store/document-type/action";

interface IDocumentTypeProps {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
}
export default function FormDocumentType({
  mode,
  isOpen,
  onClose
}: IDocumentTypeProps) {
  const dispatch = useDispatch();
  const doctypeDetail = useSelector(
    (state: RootState) => state.documenttype.doctypeDetail
  );

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        name: doctypeDetail.name
      };
    }
    return {
      name: ""
    };
  }, [doctypeDetail, mode]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("Please enter document type")
    }),
    onSubmit: (values: any, { resetForm }) => {
      const item = {
        ...values,
        files: []
      };
      if (mode === "create") {
        dispatch(addDocType(item));
        resetForm();
        onClose();
      }
      if (mode === "edit") {
        dispatch(updateDocType(doctypeDetail._id, item));
        resetForm();
        onClose();
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
        <DialogTitle>
          {mode === "edit" ? "Edit Document Type" : "Add Document Type"}
        </DialogTitle>
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
