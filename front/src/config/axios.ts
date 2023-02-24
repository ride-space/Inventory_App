import axios from "axios";

// eslint-disable-next-line import/no-default-export
export default axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
})
