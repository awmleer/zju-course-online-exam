import axios from 'axios'

const apiUrl = 'http://192.168.0.8:8000'


function handleResponse(p){
  return p.then(function (response) {
    console.log(response);
    return response.data
  }).catch(function (error) {
    throw error
  });
}


export function get(url){
  return handleResponse(axios.get(apiUrl+url))
}


export function post(url, data) {
  return handleResponse(axios.post(apiUrl+url, data))
}


export var user = null
