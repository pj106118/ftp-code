import axios from "axios";
axios.defaults.timeout = 60000;
axios.defaults.baseURL = "";
axios.defaults.withCredentials = false;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    alert("服务器异常");
    return Promise.reject(error);
  }
);

export default axios;
