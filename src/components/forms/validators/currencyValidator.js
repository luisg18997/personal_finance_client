import * as Yup from "yup";

const validationFrom = Yup.object().shape({
  name: Yup.string()
  .nullable()
  .min(5)
  .matches(/^[a-zA-Z\s]*$/, 'only letter')
  .required('is required'),
  code: Yup.string()
  .nullable()
  .min(2)
  .matches(/^\S*$/, 'not space')
  .matches(/^[a-zA-Z]*$/, 'only letter')
  .required('is required'),
  symbol: Yup.string()
  .nullable()
  .min(1)
  .matches(/^\S*$/, 'not space')
  .required('is required'),
});

export default validationFrom;