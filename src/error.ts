class AppError extends Error {
  public errorCode: number;

  public message: string;

  public data?: any;

  constructor(errorCode: number, message: string, data?: any) {
    super();
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
  }
}

export default AppError;
