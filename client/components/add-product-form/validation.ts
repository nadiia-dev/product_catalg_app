import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number().required("Required").min(0),
  availability: Yup.boolean(),
});
