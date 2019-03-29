import * as jwt from 'jsonwebtoken';

export const protectedRoute = (router) => {
  return router.use((req, res, next) => {
    const token = req.headers['access-token'];

    if(!token) {
      res.send({
        message: "No token provided"
      });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if(err) {
        return res.json({
          message: "Inavlid token"
        });
      }
      console.log(req.decoded);
      req.decoded = decoded;
      next();
    })

  });
};

