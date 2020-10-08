import * as yup from "yup";

const sailor = yup.object().shape({
  name: yup.string().required(),
  rating: yup.number().positive().required(),
  age: yup.number().positive().required(),
});

export default sailor;
