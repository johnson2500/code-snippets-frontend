import axios from 'axios';

export const makeRequest = async ({
  url, query = {}, data, method = 'get', token,
}) => {
  const queryString = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&');

  console.log(`Querying ${method} ${process.env.REACT_APP_API_URL}${url}${queryString}`);

  return axios({
    url: `${process.env.REACT_APP_API_URL}${url}${queryString}`,
    method,
    headers: {
      Authorization: `${token}`,
    },
    data,
  });
};

export const paths = {

};
