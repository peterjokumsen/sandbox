import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const insightsConnection = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ?? 'undefined';

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { insightsConnection, otherVal: 'something-else' },
    };
};

export default httpTrigger;
