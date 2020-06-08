import * as Yup from "yup";

const validationFrom = Yup.object().shape({
    email: Yup.string()
    .nullable()
    .email()
    .matches(/^\S*$/, 'not space')
    .required('is required'),
  });
  
  export default validationFrom;