import axios from 'axios';

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const makeRequest = async ({
  url, query = {}, data, method = 'get',
}) => {
  const queryString = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&');

  console.log(`Querying ${method} ${process.env.REACT_APP_API_URL}${url}${queryString}`);
  const token = getCookie('fbToken');
  return axios({
    url: `${process.env.REACT_APP_API_URL}${url}${queryString}`,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};
