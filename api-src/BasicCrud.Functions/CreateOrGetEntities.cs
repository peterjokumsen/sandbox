using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace BasicCrud.Functions;

public static class CreateOrGetEntities
{
    [FunctionName("CreateOrGetEntities")]
    public static async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.User, "get", "post", Route = "entities")] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        var requestBody = await req.ReadAsStringAsync();
        log.LogInformation("Query: [{QueryString}], Method: [{RequestMethod}], Body: [{RequestBody}]",
            req.Query,
            req.Method,
            requestBody);

        return req.Method.Equals("get", StringComparison.OrdinalIgnoreCase)
            ? new OkObjectResult(new { Message = "get all entities, to be implemented" })
            : new CreatedResult("entities", new { Message = "create entity, to be implemented" });
    }
}
