// eslint-disable-next-line import/no-mutable-exports
let BaseURL;

if (process.env.NODE_ENV === 'development') {
  BaseURL = 'http://localhost:5000/';
} else {
  BaseURL = 'not ready yet';
}

export { BaseURL };
