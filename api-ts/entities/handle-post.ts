import { EntitiesApiService } from '../services/entities-api.service';
import { Context, HttpRequest } from '@azure/functions';
import { constants } from 'http2';
import { MethodHandler } from './types';

export const handlePost: MethodHandler = async function (context: Context, req: HttpRequest, api: EntitiesApiService): Promise<void> {
  context.log(`Handling POST method. With query: ${req.query} and body: ${req.body}`);

  if (!req.body) {
    context.res = {
      status: constants.HTTP_STATUS_BAD_REQUEST,
      body: { message: 'Please pass a valid body' },
    };
    return;
  }

  try
  {
    const response = await api.createEntity(req.body);
    context.res = {
      status: response.statusCode,
      body: response.resource,
    }
  } catch (error) {
    context.res = {
      status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: { error },
    };
  }
};
