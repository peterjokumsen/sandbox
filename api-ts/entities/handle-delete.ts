import { EntitiesApiService } from '../services/entities-api.service';
import { Context, HttpRequest } from '@azure/functions';
import { constants } from 'http2';
import { MethodHandler } from './types';

export const handleDelete: MethodHandler = async function (context: Context, req: HttpRequest, api: EntitiesApiService): Promise<void> {
  context.log(`Handling DELETE method. With query: ${req.query} and body: ${req.body}`);

  if (!req.query.id) {
    context.res = {
      status: constants.HTTP_STATUS_BAD_REQUEST,
      body: 'Please pass an id on the query string',
    };
    return;
  }

  try
  {
    const response = await api.deleteEntity(req.query.id);
    context.res = {
      status: response.statusCode,
    };
  } catch (error) {
    context.res = {
      status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: { error },
    };
  }
};
