import jwt, { SignOptions } from 'jsonwebtoken';
import { AppError, errorKinds } from 'utils/error-handling';

import ENV from '../../config/env/custom-env';

export const ACCESS_TOKEN_PRIVATE_KEY = Buffer.from(
  ENV.ACCESS_TOKEN_PRIVATE_KEY!,
  'base64'
).toString('ascii');
export const ACCESS_TOKEN_PUBLIC_KEY = Buffer.from(
  ENV.ACCESS_TOKEN_PUBLIC_KEY!,
  'base64'
).toString('ascii');

const REFRESH_TOKEN_PRIVATE_KEY = Buffer.from(
  ENV.REFRESH_TOKEN_PRIVATE_KEY!,
  'base64'
).toString('ascii');
const REFRESH_TOKEN_PUBLIC_KEY = Buffer.from(
  ENV.REFRESH_TOKEN_PUBLIC_KEY!,
  'base64'
).toString('ascii');

// Sign (Create) access token using private key
export const signAccessToken = (user: any): string => {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '30m',
  };

  const payload = {
    email: user.email,
    id: user.id,
    roleId: user.roleId,
  };
  const token = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, options);
  return token;
};

// Sign(Create) refresh token using private key
export const signRefreshToken = (user: any): string => {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '7d',
  };

  const payload = {
    email: user.email,
    id: user.id,
    roleId: user.roleId,
  };
  const token = jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, options);
  return token;
};

// verify access token using public key
export const verifyAccessToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    return decoded;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw AppError.new(errorKinds.invalidToken, 'Invalid access token');
  }
};

// verify refresh token using public key
export const verifyRefreshToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    return decoded;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw AppError.new(errorKinds.invalidToken, 'Invalid refresh token');
  }
};
