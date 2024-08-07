import { Request } from 'express';
import { SECRET_KEY } from '@config';
import { verify } from 'jsonwebtoken';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { nodemailer } from 'nodemailer';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};
/**
 *
 * @param req
 * @description find user id from cookie
 * @return current user id if the user is login in the application
 */
export const getUserFromCookieId = async (req: Request) => {
  const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
  const secretKey: string = SECRET_KEY;
  const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
  return verificationResponse._id;
};

/**
 *
 * @param req
 * @description find user email from cookie
 * @return current user email if the user is login in the application
 */
export const getUserEmailFromCookie = async (req: Request) => {
  const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
  const secretKey: string = SECRET_KEY;
  const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
  return verificationResponse.email;
};