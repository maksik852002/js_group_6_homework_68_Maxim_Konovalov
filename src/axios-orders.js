import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://base-konovalov.firebaseio.com/'
});

export default axiosOrders;