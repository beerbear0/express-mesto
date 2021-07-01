const jwt = require('jsonwebtoken');


function handleAuthError(res) {
    res
      .status(403)
      .send ({ message: 'Необходиа авторизация '})
}

const extractBearerToken = (header) => {
  return header.replace('Bearer', '')
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res)
  }
  const token  = extractBearerToken(authorization);
  let payload

  try {
    payload = jwt.verify(token, 'some-secret-key')
  } catch (err) {
    handleAuthError(next)
  }
  req.user = payload;

  next()
}