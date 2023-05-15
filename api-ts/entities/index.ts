import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { EntitiesApiService } from '../services/entities-api.service';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log(`HTTP trigger function processed a ${req.method} request. With query: ${req.query} and body: ${req.body}`);
  const api = new EntitiesApiService();

  let response;
  if (req.method === 'GET') {
    response = await api.getEntities();
  } else if (req.method === 'POST' && req.body) {
    response = await api.createEntity(req.body);
  } else if (req.method === 'DELETE') {
    if (!req.query.id) {
      context.res = {
        status: 400,
        body: 'Please pass an id on the query string',
      };
      return;
    }

    response = await api.deleteEntity(req.query.id);
  } else {
    context.res = {
      status: 405,
      body: 'Please pass a valid method',
    };
    return;
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: response,
  };
};

export default httpTrigger;
