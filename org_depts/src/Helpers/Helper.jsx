import axios from 'axios';
const base_url = import.meta.env.VITE_BACK_URL;
const login_url = `${base_url}login`;
const token = localStorage.getItem('x-access-token_yb');

export function config() {
    return {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
}

export function logOut() {
    localStorage.removeItem('x-access-token_yb');
    sessionStorage.removeItem('yb_user');
    localStorage.removeItem('x-access-token_yb-expiration')
    window.location = '/';
}

export function AEP() {
    return axios.get(base_url + 'auth-ep', config)
        .then(response => {
            // console.log('resp', response)
            return response.data
        })
        .catch((err) => Promise.reject(err.response.data.error)
        );
}


export function login_(a,b,c) {
    // console.log('data', data)
    return axios.post(login_url, { orgid: a, username: b, password: c })
        .then(response => {
            // console.log('resp', response)
            localStorage.setItem('x-access-token_yb', response.data.token);
            sessionStorage.setItem('ybuser', JSON.stringify(response.data.user_data));
            localStorage.setItem('x-access-token_yb-expiration', Date.now() + 12 * 60 * 60 * 1000);
            return response.data
        })
        .catch((err) => Promise.reject(err.response.data.message)
        );
}


export function isAuth() {
    if(localStorage.getItem('x-access-token_yb-expiration') && localStorage.getItem('x-access-token_yb-expiration') < Date.now()) logOut();
    
    return localStorage.getItem('x-access-token_yb') && localStorage.getItem('x-access-token_yb-expiration') > Date.now() && sessionStorage.getItem('ybuser')
}

