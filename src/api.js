import axios from 'axios'

const apiUrl = 'http://localhost:8000'

export function get(url){
  return axios.get(apiUrl+url)
    .then(function (response) {
      console.log(response);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
