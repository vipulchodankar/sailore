import axios from "../../services/axios";

export const createSailor = (data: any) =>
  axios({
    method: "POST",
    url: `/sailor`,
    data,
  });

export const fetchSailors = () =>
  axios({
    method: "GET",
    url: `/sailor`,
  });

export const fetchOneSailor = (SID: number) =>
  axios({ method: "GET", url: `/sailor/${SID}` });

export const updateSailor = (data: any) =>
  axios({
    method: "PUT",
    url: `/sailor/${data.SID}`,
    data,
  });

export const deleteSailor = (SID: number) =>
  axios({
    method: "PUT",
    url: `/sailor/${SID}`,
  });
