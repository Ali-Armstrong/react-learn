import axios from 'axios';

const instance = axios.create({
    baseURL : "https://react-burger-builder-99b02-default-rtdb.firebaseio.com/"
});

export default instance;