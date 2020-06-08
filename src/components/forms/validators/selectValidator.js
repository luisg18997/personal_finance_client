import * as Yup from "yup";

const validationFrom = Yup.object().shape({
    data: Yup.string()
        .required('is required')
        .test('selectvalue', 'Select a option', (value) => {return value !==''}),
});

export default validationFrom;