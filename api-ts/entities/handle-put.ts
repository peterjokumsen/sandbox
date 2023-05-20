import { Context, HttpRequest } from '@azure/functions';
import { MethodHandler } from './types';
import { EntitiesApiService } from '../services/entities-api.service';
import { constants } from 'http2';

export const handlePut: MethodHandler = async function (context: Context, req: HttpRequest, api: EntitiesApiService): Promise<void> {
  context.log(`Handling PUT method. With query: ${req.query} and body: ${req.body}`);

  if (!req.body) {
    context.res = {
      status: constants.HTTP_STATUS_BAD_REQUEST,
      body: { message: 'Please pass a valid body' },
    };
    return;
  }
  const id = req.query?.id ?? req.body?.id;
  if (!id) {
    context.res = {
      status: constants.HTTP_STATUS_BAD_REQUEST,
      body: { message: 'Please pass a valid id, using query parameter or in body of request' },
    };
    return;
  }

  try {
    const existing = await api.getEntityItem(id);
    const existingResponse = await existing.read();
    if (existingResponse.statusCode !== constants.HTTP_STATUS_OK) {
      context.res = {
        status: existingResponse.statusCode,
        body: { resource: existingResponse.resource },
      };
      return;
    }

    const latest = {
      ...existingResponse.resource,
      ...req.body,
      id,
    };
    const { resource, statusCode } = await existing.replace(latest);
    context.res = {
      status: statusCode,
      body: { resource },
    };
  } catch (error) {
    context.log('Failed to update entity', { error });
    context.res = {
      status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: { error },
    };
  }
}
