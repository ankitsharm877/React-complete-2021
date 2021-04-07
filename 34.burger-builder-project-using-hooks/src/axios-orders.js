import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-e2537-default-rtdb.firebaseio.com/'
});

export default instance;