import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const addmessage = (data) => API.post("/message/", data);
export const getMessage = (id) => API.get(`/message/${id}`);
