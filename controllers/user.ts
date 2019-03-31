import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';
import { validationResult } from 'express-validator/check';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(403).json({
          email: 'Email was not found.'
        });
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          return res.status(403).json({
            password: 'Password is incorrect.'
          });
        }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({
          success: 'true',
          token: token
        });
      });
    });
  };

  /**
   * Insert item
   * @param req
   * @param res
   */
  insert = async (req, res) => {
    const userExists = await User.find({ email: req.body.email });
    if (userExists.length) {
      return res.status(400).json({ error: 'User already exists' });
    }
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const obj = await new this.model(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}
