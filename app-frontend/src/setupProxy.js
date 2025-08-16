const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = process.env.REACT_APP_BACKEND_URL;

module.exports = (app) => {
  app.use(
    "/reverser",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    "/summation",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
};
