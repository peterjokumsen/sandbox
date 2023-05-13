import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { EntitiesApiService } from '../services/entities-api.service';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log(`HTTP trigger function processed a ${req.method} request. With query: ${req.query} and body: ${req.body}`);
  const api = new EntitiesApiService();

  let response;
  if (req.method === "GET") {
    response = await api.getEntities();
  } else {
    if (req.body) {
      response = await api.createEntity(req.body);
    } else {
      context.res = {
        status: 400,
        body: "Please pass an entity in the request body",
      };
      return;
    }
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: response,
  };
};

export default httpTrigger;
