const headers: { [id: string]: string } = {
  'Content-Type': 'application/json;charset=utf-8'
};

const call = (path: string, method: string, data?: Object): Promise<Response> => {
  return fetch(process.env.REACT_APP_BACKEND_ENDPOINT + path, {
    method,
    mode: process.env.REACT_APP_BACKEND_ENDPOINT == '' ? 'no-cors' : 'cors',
    body: data && JSON.stringify(data),
    headers
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }

    return response;
  });
};

export const get = (path: string, data?: Object) => call(path, 'get', data);
export const post = (path: string, data?: Object) => call(path, 'post', data);
export const patch = (path: string, data?: Object) => call(path, 'patch', data);
export const put = (path: string, data?: Object) => call(path, 'put', data);
export const del = (path: string, data?: Object) => call(path, 'delete', data);

export const setHeader = (key: string, value: string): void => {
  headers[key] = value;
};

export const removeHeader = (key: string): void => {
  delete headers[key];
};