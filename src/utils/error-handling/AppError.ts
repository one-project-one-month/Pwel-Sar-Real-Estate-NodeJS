/* eslint-disable no-unused-vars */
import { Response } from 'express';

import { StatusCode } from '../../config/Status';

interface errorPayload<T extends payload> {
  errors?: T | {};
  message: string;
}

type payload = Record<number | string | symbol, string[]>;

export const errorKinds = {
  accessDenied: 'accessDenied',
  alreadyExist: 'alreadyExist',
  badRequest: 'badRequest',
  forbidden: 'forbidden',
  internalServerError: 'internalErrorServer',
  invalidCredential: 'invalidCredential',
  invalidToken: 'invalidToken',
  mailboxUnavailable: 'mailboxUnavailable',
  notAuthorized: 'notAuthorized',
  notFound: 'notFound',
  oauthAccountAlreadyExist: 'oauthAccountAlreadyExist',
  unVerifyAccount: 'unVerifyAccount',
  validationFailed: 'validationFailed',
} as const;

export type errorKindsType = (typeof errorKinds)[keyof typeof errorKinds];

export const isErrorKinds = (message: any): message is errorKindsType => {
  return Object.values(errorKinds).includes(message);
};

export class AppError extends Error {
  public statusCode: number = StatusCode.InternalServerError;
  constructor(
    public error: errorKindsType,
    public message: string,
    public payload?: payload | {}
  ) {
    super();
    this.statusCode = this.getStatus();
    (Error as any).captureStackTrace(this, this.constructor);
  }

  static new(
    error: errorKindsType = errorKinds.internalServerError,
    message = 'internal Server Error',
    payload?: payload
  ) {
    return payload
      ? new AppError(error, message, payload)
      : new AppError(error, message);
  }

  errorPayload(payload?: payload): errorPayload<payload | {}> {
    return {
      errors: payload ?? {},
      message: this.message,
    };
  }

  getStatus() {
    // let error_status : StatusCode = StatusCode.InternalServerError;
    switch (this.error) {
      case errorKinds.accessDenied:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.alreadyExist:
        this.statusCode = StatusCode.Conflict;
        break;
      case errorKinds.badRequest:
        this.statusCode = StatusCode.BadRequest;
        break;
      case errorKinds.forbidden:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.internalServerError:
        this.statusCode = StatusCode.InternalServerError;
        break;
      case errorKinds.invalidCredential:
        this.statusCode = StatusCode.UnprocessableEntity;
        break;
      case errorKinds.invalidToken:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.mailboxUnavailable:
        this.statusCode = StatusCode.MailboxUnavailable;
        break;
      case errorKinds.notAuthorized:
        this.statusCode = StatusCode.Unauthorized;
        break;
      case errorKinds.notFound:
        this.statusCode = StatusCode.NotFound;
        break;
      case errorKinds.oauthAccountAlreadyExist:
        this.statusCode = StatusCode.Conflict;
        break;
      case errorKinds.unVerifyAccount:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.validationFailed:
        this.statusCode = StatusCode.UnprocessableEntity;
        break;
    }
    return this.statusCode;
  }

  response(res: Response) {
    return res
      .status(this.statusCode)
      .json(this.errorPayload(this.payload))
      .end();
  }
}

// export default AppError;
