export const baseUrl = 'https://api.santelar.nomoredomains.icu';

//export const baseUrl = 'http://localhost:3001';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

export const register = (email, password) => {
  return fetch (`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => checkResponse(res));
};

export const login = (email, password) => {
  return fetch (`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => checkResponse(res));
};

export const getData = (token) => {
  return fetch (`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res));
};
