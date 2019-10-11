import axios from 'axios';

let BaseURL;

if (process.env.NODE_ENV === 'development') {
  BaseURL = 'http://localhost:5000/';
} else {
  BaseURL = 'not ready yet';
}

const Axios = axios.create({
  baseURL: BaseURL,
});

export default Axios;
