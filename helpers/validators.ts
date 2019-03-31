import { check } from 'express-validator/check';

/**
 * Method check if the field is empty
 * @param field
 */
export const fieldNotEmpty = (field) => {
  return check(field, `${ field } cannot be empty`).not().isEmpty();
};

/**
 * Method check if the field is between min and max
 * @param field
 * @param min
 * @param max
 */
export const fieldBetween = (field, min, max) => {
  return check(field, `${ field } must be between ${ min } and ${ max } characters`).isLength({
    min,
    max
  });
};

export const postValidator = () => {
  return [
    fieldNotEmpty('title'),
    fieldBetween('title', 4, 150),
    fieldNotEmpty('body'),
    fieldBetween('body', 4, 2000)
  ];
};

export const userValidator = () => {
  return [
    fieldNotEmpty('username'),
    fieldBetween('username', 4, 40),
    fieldNotEmpty('email'),
    fieldBetween('email', 4, 150),
    fieldBetween('password', 4, 150),
    fieldNotEmpty('password'),
    check('email', 'Please provide a valid email address').isEmail()
  ];
};
