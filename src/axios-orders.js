import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-tire-tracker.firebaseio.com/'
})

export default instance;

