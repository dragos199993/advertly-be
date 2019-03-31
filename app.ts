require('dotenv').config();
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import setRoutes from './routes';
import { ENV_TEST, ENV_DEV } from './config/constants/server';

const app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let mongodbURI;
if (process.env.NODE_ENV === ENV_TEST) {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan(ENV_DEV));
}
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongodbURI, { useNewUrlParser: true })
  .then(db => {
    setRoutes(app);
    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Server is listening to port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

export { app };
