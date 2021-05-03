import axios from "axios";

let url;
if (process.env.NODE_ENV === "development") {
  console.log("developing mode");
  url = "http://localhost:5000/api";
}

if (process.env.NODE_ENV === "production") {
  console.log("production mode");
  console.log(process.env.PORT);
  url = "api";
}
const api = axios.create({
  baseURL: url,
});
export default api;
