import * as yup from "yup";

export const nameSchema = yup.object({
  name: yup.string().required("Please enter this field")
});
export const githubSchema = yup.object({
  github: yup.string().url("Invalid link").required("Please enter this field")
});
export const facebookSchema = yup.object({
  facebook: yup.string().url("Invalid link").required("Please enter this field")
});
export const passwordSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Please enter this field"),
  confirmPassword: yup.string().when("password", {
    is: (val: any) => !!(val && val.length > 0),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same")
  })
});
