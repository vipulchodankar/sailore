import * as yup from "yup";

const sailor = yup.object().shape({
  SNAME: yup.string().required(),
  RATING: yup.number().positive().required(),
  AGE: yup.number().positive().required(),
});

export default sailor;
