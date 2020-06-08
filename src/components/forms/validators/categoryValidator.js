import * as Yup from "yup";

const validationFrom = Yup.object().shape({
  name: Yup.string()
  .nullable()
  .min(5)
  .matches(/^[a-zA-Z\s]*$/, 'only letter')
  .required('is required'),
  description: Yup.string()
  .max(40)
  .matches(/^[a-zA-Z\s]*$/, 'only letter'),
});

export default validationFrom;