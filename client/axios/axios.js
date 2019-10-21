import axios from 'axios';
import { BaseURL } from '../constants';

const Axios = axios.create({
  baseURL: BaseURL,
});

export default Axios;
