import axios from "axios";

const ax = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:6969"
      : window.location.origin + "/api",
  headers: {
    "Content-type": "application/json"
  }
});

export default ax;
