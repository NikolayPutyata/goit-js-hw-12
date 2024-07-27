import axios from 'axios';

export default function createHttpRequest(options) {
  return axios
    .get('https://pixabay.com/api', options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}
