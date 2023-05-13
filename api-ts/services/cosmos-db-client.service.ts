import { CosmosClient } from "@azure/cosmos";

export class CosmosDbClientService {
  private readonly _endpoint = process.env.COSMOS_DB_ENDPOINT;
  private readonly _key = process.env.COSMOS_DB_KEY;
  dbClient: CosmosClient = new CosmosClient({
    endpoint: this._endpoint,
    key: this._key,
    consistencyLevel: "Session",
  });
}
