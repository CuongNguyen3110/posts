import Axios from 'axios';

export const apiFetchPost = () => { 
    return Axios.get('https://jsonplaceholder.typicode.com/posts').then(response => response.data) 
}

export const apiAddNewPost = (data) => {
    return Axios.post('https://jsonplaceholder.typicode.com/posts', data).then(response => response.data)
}




