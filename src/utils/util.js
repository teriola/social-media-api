exports.sendError = (message, code) => {
  throw ({ message, code, name: 'Custom error' });
};
