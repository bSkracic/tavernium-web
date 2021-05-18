import axios from "axios";

const API_URL = "http://localhost:1337/api/v1";
const AUTH_API_URL = "http://localhost:6969/api/auth";

const axiosInstance = axios.create({ baseURL: API_URL });
const axiosInstanceAuth = axios.create({ baseURL: AUTH_API_URL });

/*
    Creates axios request for protected endpoint that requires authorization token. If access token is not valid or present,
    it tries to refresh it then repeats request.
*/
const restrictedRequest = (context, method, api, data, callback) => {
  axios({
    method: method, 
    url: API_URL + api,
    data: data,
    headers: {
      Authorization: `Bearer ${context.$cookies.get("ACCESS_TOKEN")}`,
    },
  })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err !== null) {
        if (
          (err.response.status === 403 || err.response.status === 401) &&
          context.$cookies.get("REFRESH_TOKEN") !== null
        ) {
          // Access token is invalid, request new
          axiosInstanceAuth
            .post("/token", { token: context.$cookies.get("REFRESH_TOKEN") })
            .then((res) => {
              context.$cookies.set("ACCESS_TOKEN", res.data.access_token);
              axios({
                method: method,
                url: API_URL + api,
                data: data,
                headers: {
                  Authorization: `Bearer ${context.$cookies.get(
                    "ACCESS_TOKEN"
                  )}`,
                },
              })
                .then((res) => {
                  callback(res);
                })
                .catch(() => {
                  callback(null);
                });
            })
            .catch(() => {
              callback(null);
            });
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
};

export default {
  async get(api) {
    return axiosInstance.get(api);
  },
  async post(api, object) {
    return axiosInstance.post(api, object);
  },
  async put(api, object) {
    return axiosInstance.put(api, object);
  },
  async delete(api, object) {
    return axiosInstance.delete(api, object);
  },
  restrictedRequest,
  axiosInstanceAuth,
};
