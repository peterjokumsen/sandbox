import { Context, HttpRequest } from '@azure/functions';
import { EntitiesApiService } from '../services/entities-api.service';
import { MethodHandler } from './types';

export const handleGet: MethodHandler = async function (context: Context, req: HttpRequest, api: EntitiesApiService): Promise<void> {
  context.log(`Handling GET method. With query: ${req.query} and body: ${req.body}`);

  const { resources } = await api.getEntities();
  context.res = {
    body: { resources },
  };
}
