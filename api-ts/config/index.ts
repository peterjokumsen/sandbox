import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const envValue = process.env.ENV_VALUE ?? 'undefined';

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { envValue, otherVal: 'something-else' },
    };
};

export default httpTrigger;
