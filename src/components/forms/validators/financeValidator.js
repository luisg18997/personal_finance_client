import * as Yup from "yup";
import moment from 'moment';

const now = moment()


const validationFrom = Yup.object().shape({
    title: Yup.string()
        .min(5)
        .max(30)
        .required('is required')
        .matches(/^[a-zA-Z\s]*$/, 'only letter'),
    description: Yup.string()
        .min(10)
        .required('is required')
        .matches(/^[a-zA-Z\s]*$/, 'only letter'),
    mount: Yup.string()
        .min(1)
        .matches(/^\S*$/, 'not space')
        .required('is required')
        .matches(/^[0-9.]*$/, 'only number and point'),
    categoryId: Yup.string()
        .required('is required')
        .test('selectvalue', 'Select a option', (value) => {return value !==''}),
    currencyId: Yup.string()
        .required('is required')
        .test('selectvalue', 'Select a option', (value) => {return value !==''}),
    financeDate: Yup.date()
        .required('is required')
        .max(now, 'You cannot select a date after the current date'),
    financeHour: Yup.string()
        .required('is required')
});

export default validationFrom;