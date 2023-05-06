using System;
using System.Threading;
using System.Threading.Tasks;
using BasicCrud.Functions.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace BasicCrud.Functions;

public class CreateOrGetEntities
{
    private readonly IEntityRepo _entityRepo;
    private readonly ILogger<CreateOrGetEntities> _log;

    public CreateOrGetEntities(IEntityRepo entityRepo, ILogger<CreateOrGetEntities> log)
    {
        _entityRepo = entityRepo;
        _log = log;
    }

    [FunctionName("CreateOrGetEntities")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "entities")] HttpRequest req,
        CancellationToken cancellationToken = default)
    {
        _log.LogInformation("C# HTTP trigger function processed a request.");

        var requestBody = await req.ReadAsStringAsync();
        _log.LogInformation("Query: [{QueryString}], Method: [{RequestMethod}], Body: [{RequestBody}]",
            req.Query,
            req.Method,
            requestBody);

        if (req.Method.Equals("get", StringComparison.OrdinalIgnoreCase))
        {
            var result = await _entityRepo.GetEntities(cancellationToken);
            return new OkObjectResult(
                new
                {
                    Message = "Returning entities",
                    Data = result,
                });
        }

        var createdResult = await _entityRepo.CreateEntity(requestBody, cancellationToken);
        return new CreatedResult("entities", new { Message = "Created entity", Data = createdResult });
    }
}
