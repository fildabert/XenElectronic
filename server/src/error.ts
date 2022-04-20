/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum ErrorCode {
  VALIDATION_ERRORS = 'VALIDATION_ERRORS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  CART_NOT_FOUND = 'CART_NOT_FOUND'
}

export const errorMap = {
  [ErrorCode.VALIDATION_ERRORS]: {
    code: 400,
    message: 'Validation Errors',
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    code: 500,
    message: 'Internal Server Error',
  },
  [ErrorCode.CART_NOT_FOUND]: {
    code: 400,
    message: 'Cart Not Found',
  },
};

class AppError extends Error {
  public errorCode: number;

  public message: string;

  public data?: any;

  constructor(errorCode: ErrorCode, data?: any) {
    super();
    this.errorCode = errorMap[errorCode].code;
    this.message = errorMap[errorCode].message;
    this.data = data;
  }
}

export default AppError;
