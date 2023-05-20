import { MethodHandler } from './types';
import { Context, HttpRequest } from '@azure/functions';
import { constants } from 'http2';

export const handleUnexpected: MethodHandler = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log(`Handling unexpected method. With query: ${req.query} and body: ${req.body}`);

  context.res = {
    status: constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
    body: { message: 'Method not handled' },
  };
}
