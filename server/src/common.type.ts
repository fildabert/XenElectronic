/* eslint-disable import/prefer-default-export */
import { Request } from 'express';

interface ApiResponse<T> {
  data?: T,
  message: string
}

type ApiRequest<T> = Request<{}, {}, T>

export {
  ApiResponse,
  ApiRequest,
};
