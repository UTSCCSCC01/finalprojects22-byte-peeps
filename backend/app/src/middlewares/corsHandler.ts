// Adapted from: https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
let allowedOrigins = [
  `http://localhost:${process.env.FRONTEND_PORT}`,
  'https://c01.mohamedtayeh.com',
  'https://datalytic.ml',
  'https://www.datalytic.ml',
];

const corsHandler = {
  origin: function (origin: string | undefined, callback: Function) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

export default corsHandler;
