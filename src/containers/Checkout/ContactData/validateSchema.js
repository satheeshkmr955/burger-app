import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(6, "Name should greater than 6 character!")
    .max(15, "Name should less than 15 character!")
    .trim(),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!")
    .lowercase()
    .trim(),
  street: Yup.string()
    .required("Street is required!")
    .trim(),
  postal: Yup.number()
    .required("Postal is required!")
    .positive("Postal should be positive!"),
  country: Yup.string()
    .required("Country is required!")
    .trim(),
  deliveryMethod: Yup.object()
    .shape({
      label: Yup.string()
        .required()
        .trim(),
      value: Yup.string()
        .required()
        .trim()
        .uppercase()
    })
    .required("Delivery method is required!")
    .nullable()
});
export default validationSchema;
