import axios from 'axios';
import { apiUrl as baseURL } from '@utils/config';

const httpClient = axios.create({
  baseURL,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
});

const httpClientAuthorized = (token: string) =>
  axios.create({
    baseURL,
    responseType: 'json',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

export { httpClient, httpClientAuthorized };
