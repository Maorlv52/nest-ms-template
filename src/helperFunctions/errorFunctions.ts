import { HttpException, HttpStatus } from '@nestjs/common';
import logger from '../configs/logger';

export const errorHandler = (
  error: unknown,
  contextMessage = 'An error occurred',
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): never => {
  if (error instanceof Error) {
    const message = `${contextMessage}: ${error.message}`;
    logger.error(message);

    throw new HttpException(message, statusCode);
  } else {
    const message = `${contextMessage}: Unknown error`;
    logger.error(message);

    throw new HttpException(message, statusCode);
  }
};
