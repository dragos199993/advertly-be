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
      // Pass decoded response of token to the req object
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided'
    });
  }
};

/**
 * Method check if the user token _id is the same as the user he is trying to access
 * @param req
 * @param res
 * @param next
 */
export const hasAuthorization = (req, res, next) => {
  if (req.params.id && req.params.id !== req.decoded.user._id) {
    return res.status(401).json({ error: 'You are not authorized to see this profile' });
  }
  next();
};
