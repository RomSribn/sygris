import axios from 'axios';

const APP_API_BASE_URL = 'http://sygris-assesment.fthphwfve4dreybs.westeurope.azurecontainer.io/api/v1/';

const httpClient = axios.create({
  baseURL: APP_API_BASE_URL,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
});

export { httpClient };
