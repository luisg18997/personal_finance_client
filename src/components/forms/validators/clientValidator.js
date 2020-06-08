import * as Yup from "yup";
import moment from 'moment';

const SUPPORTED_FORMATS = ['image/jpeg','image/jpg', 'image/png']

const validationFrom = Yup.object().shape({
  name: Yup.string()
  .max(10)
  .matches(/^[a-zA-Z\s]*$/, 'only letter'),
  last_name: Yup.string()
  .max(10)
  .matches(/^[a-zA-Z\s]*$/, 'only letter'),
  email: Yup.string()
  .email(),
    birth_date: Yup.string()
    .nullable()
    .test(
        "DOB",
        "Birht date not valid",
        value => {
            if(value !== null) {
                return moment().diff(moment(value),'years') >= 18;
            }   else {
                return true
            }   
        }
    ),
    avatarFile: Yup.mixed()
    .nullable()
    .test('fileType', "Unsupported File Format", value =>{
        if(value !== null){
            return SUPPORTED_FORMATS.includes(value.type)
        }else {
            return true
        }   
    })
});

export default validationFrom;