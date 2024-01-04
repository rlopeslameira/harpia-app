import axios from 'axios';

const api = axios.create({
  baseURL: "http://aplicativomaisescola.online/api/",  
  // baseURL: "http://192.168.100.72:3000/",  
});

// api.interceptors.request.use(function (config) {
//   return config
// }, function (error) {
//   return Promise.reject('Erro de conexão.');
// });

// api.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {    
//   return Promise.reject({...error, message: 'Erro de conexão.'});
// });

export default api;
