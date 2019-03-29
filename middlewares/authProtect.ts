import * as jwt from 'jsonwebtoken';

export const authProtect = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers.authorization;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Not authorized'
        });
      }
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided'
    });
  }
};
