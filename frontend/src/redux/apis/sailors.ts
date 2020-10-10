import axios from "../../services/axios";

export const fetchSailors = () =>
  axios({
    method: "GET",
    url: `/sailor`,
  });
