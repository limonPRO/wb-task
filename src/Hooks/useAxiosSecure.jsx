import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://itder.com/api/',
});

const useAxiosSecure = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if(token){
        config.headers["Authorization"] = "Bearer " + token
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  );
  return axiosInstance;
};

// Reusable GET function
export const axiosGet = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const axiosPost = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export default useAxiosSecure;

// (config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
//   return config;
// },
// (error) => {
//   Promise.reject(error);
// }