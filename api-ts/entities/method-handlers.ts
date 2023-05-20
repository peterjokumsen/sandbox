import { HTTPMethod } from '@azure/cosmos';
import { MethodHandler } from './types';

export const methodHandlers: Partial<Record<HTTPMethod, MethodHandler>> & { default: MethodHandler } = {
  'GET': require('./handle-get').handleGet,
  'POST': require('./handle-post').handlePost,
  'PUT': require('./handle-put').handlePut,
  'DELETE': require('./handle-delete').handleDelete,
  'default': require('./handle-unexpected').handleUnexpected,
};
