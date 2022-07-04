import * as yup from "yup";

export const formTagSchema = yup.object({
  name: yup.string().required("Please enter title"),
  description: yup.string().required("Please enter description")
});
