import * as yup from "yup";

export const formPostSchema = yup.object({
  title: yup.string().required("Please enter title"),
  
});
