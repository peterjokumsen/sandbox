import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const envValue = process.env.ENV_VALUE;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { envValue }
    };

};

export default httpTrigger;
