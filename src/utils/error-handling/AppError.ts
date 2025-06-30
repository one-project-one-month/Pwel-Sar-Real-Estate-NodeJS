import { StatusCode } from "../../config/Status";
import { Response } from "express";

type payload = {
  [key in string | number | symbol]: string[];
};

type errorPayload<T extends payload> = {
  message: string;
  errors?: T | {};
};

export const errorKinds = {
  invalidToken: "invalidToken",
  internalServerError: "internalErrorServer",
  validationFailed: "validationFailed",
  invalidCredential: "invalidCredential",
  notFound: "notFound",
  notAuthorized: "notAuthorized",
  alreadyExist: "alreadyExist",
  forbidden: "forbidden",
  accessDenied: "accessDenied",
  unVerifyAccount: "unVerifyAccount",
  badRequest: "badRequest",
  oauthAccountAlreadyExist: "oauthAccountAlreadyExist",
  mailboxUnavailable: "mailboxUnavailable",
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
    message: string = "internal Server Error",
    payload?: payload
  ) {
    return payload
      ? new AppError(error, message, payload)
      : new AppError(error, message);
  }

  errorPayload(payload?: payload): errorPayload<payload | {}> {
    return {
      message: this.message,
      errors: payload ? payload : {},
    };
  }

  getStatus() {
    // let error_status : StatusCode = StatusCode.InternalServerError;
    switch (this.error) {
      case errorKinds.internalServerError:
        this.statusCode = StatusCode.InternalServerError;
        break;
      case errorKinds.invalidToken:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.notFound:
        this.statusCode = StatusCode.NotFound;
        break;
      case errorKinds.notAuthorized:
        this.statusCode = StatusCode.Unauthorized;
        break;
      case errorKinds.validationFailed:
        this.statusCode = StatusCode.UnprocessableEntity;
        break;
      case errorKinds.invalidCredential:
        this.statusCode = StatusCode.UnprocessableEntity;
        break;
      case errorKinds.alreadyExist:
        this.statusCode = StatusCode.Conflict;
        break;
      case errorKinds.forbidden:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.accessDenied:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.unVerifyAccount:
        this.statusCode = StatusCode.Forbidden;
        break;
      case errorKinds.oauthAccountAlreadyExist:
        this.statusCode = StatusCode.Conflict;
        break;
      case errorKinds.badRequest:
        this.statusCode = StatusCode.BadRequest;
        break;
      case errorKinds.mailboxUnavailable:
        this.statusCode = StatusCode.MailboxUnavailable;
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
