exports.sendError = (err, code) => {
  throw new Error(err, { cause: code });
};
