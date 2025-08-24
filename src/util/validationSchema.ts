import * as yup from 'yup';
import countries from '../util/countries';

const FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/heic',
];

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^\p{Lu}/u, 'Name must start with a capital letter'),

  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),

  email: yup
    .string()
    .required('E-mail is required')
    .email('Email must have valid format'),

  password: yup
    .string()
    .required('Password is required')
    .matches(/\d/, 'Password must contain a number')
    .matches(/\p{Lu}/u, 'Password must contain an uppercase letter')
    .matches(/\p{Ll}/u, 'Password must contain a lowercase letter')
    .matches(
      /[-+:|/\\%*#@$!?^&]/,
      'Password must contain a character from "-+/%*:#@$!?|^&"'
    )
    .min(8, 'Minimum password length 8 characters'),

  passwordConfirm: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),

  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender must be male or female')
    .required('Gender is required'),

  isAccept: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),

  country: yup
    .string()
    .required('Country is required')
    .oneOf(countries, 'Should be a country from the list'),

  image: yup
    .mixed<FileList>()
    .required('File is required')
    .test('required', 'File is required', (files) => {
      return !!files && files.length > 0;
    })
    .test(
      'fileSize',
      `File size must not exceed ${FILE_SIZE} bytes`,
      (files) => {
        return !files?.[0] || files[0].size <= FILE_SIZE;
      }
    )
    .test('fileFormat', 'Only jpeg and png files are allowed', (files) => {
      return !files?.[0] || SUPPORTED_FORMATS.includes(files[0].type);
    }),
});
