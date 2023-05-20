import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { EntitiesApiService } from '../services/entities-api.service';
import { methodHandlers } from './method-handlers';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const start = new Date();

  context.log(`HTTP trigger function processing`);
  const api = new EntitiesApiService();

  const handler = methodHandlers[req.method] ?? methodHandlers.default;
  await handler(context, req, api);

  const end = new Date();
  const duration = end.getTime() - start.getTime();
  context.log(`HTTP trigger function processed in ${duration}ms`);
};

export default httpTrigger;
