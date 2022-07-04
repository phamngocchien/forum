import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  msv: Yup.string().required("Please enter student code"),
  password: Yup.string().required("Please enter password")
});
