import { CosmosClient } from '@azure/cosmos';
import { CosmosDbClientService } from './cosmos-db-client.service';

export class EntitiesApiService {
  private readonly _databaseId = 'Basic';
  private readonly _containerId = 'entity';
  private readonly _client: CosmosClient;

  constructor() {
    const db = new CosmosDbClientService();
    this._client = db.dbClient;
  }

  async getEntities() {
    return await this._client
      .database(this._databaseId)
      .container(this._containerId)
      .items.readAll()
      .fetchAll();
  }

  async createEntity(entity: any) {
    // if no id set in entity, set to random guid
    if (!entity.id) {
      entity.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    const { resource, statusCode, substatus } = await this._client
      .database(this._databaseId)
      .container(this._containerId)
      .items.create(entity);

    return { resource, statusCode, substatus };
  }
}
