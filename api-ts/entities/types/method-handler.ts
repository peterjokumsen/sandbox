import { EntitiesApiService } from '../../services/entities-api.service';
import { Context, HttpRequest } from '@azure/functions';

export type MethodHandler = (context: Context, req: HttpRequest, api: EntitiesApiService) => Promise<void>;
