const baseURL = 'http://localhost:5000/api';

const endpoints = {
  register: '/register',
  login: '/login',
  logout: '/logout',
  refresh: '/refresh',
  users: '/users',
}

const dynamicEndpoints = {
  activate: (link: string): string => `/activate/${link}`,
};

export {
  baseURL,
  endpoints,
  dynamicEndpoints,
}