import * as Yup from "yup";

const validationFrom = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .max(16)
    .matches(/[a-z]/, 'at least one lowercase char')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .matches(/^\S*$/, 'not space')
    .matches(/[0-9]/, 'at least 1 number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'at least  one special char (@,!,#, etc).')
    .required('is required')
    .nullable(),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords don`t match')
    .required('is required')
    .nullable(),
});

export default validationFrom;