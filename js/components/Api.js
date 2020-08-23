export default class Api {
    constructor(login) {
        this._login  = login;
    }
    addMassage(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                LOGIN: this._login,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    }
}