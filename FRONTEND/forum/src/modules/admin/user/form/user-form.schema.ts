import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required("Please enter name"),
  msv: yup.string().required("Please enter student code"),
  major: yup.string().required("Please enter major"),
  role: yup.string().required("Please enter role")
});
