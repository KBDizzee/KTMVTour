import * as yup from 'yup';

export const postSchema = yup.object({
  location: yup.string().required('Please provide the location of your experience'),
  caption: yup.string().required('Please provide post caption')
})