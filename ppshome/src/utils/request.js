import axios from 'axios'
// import store from '@/store'

const myAxios = axios.create({
    baseURL: 'https://pps-api.vercel.app',
    // baseURL_f:'http://192.168.10.3:5000'
    timeout:3000
})

// 请求拦截器
// myAxios.interceptors.request.use(function (config) {
//     if (store.state.token) {
//       config.headers.Authorization = store.state.token
//     }
//     return config
//   })

myAxios.interceptors.response.use(
    function (response) {
        return response
    },
    (error) => {
        const baseURL = 'http://192.168.10.3:5000'
        const url = error.config.url
        const params = error.config.params
        const delay = new Promise(function (resolve) {
            resolve();
        });
        return delay.then(function () {
            return myAxios({ baseURL: baseURL + url, params });
        });

    })


export default myAxios