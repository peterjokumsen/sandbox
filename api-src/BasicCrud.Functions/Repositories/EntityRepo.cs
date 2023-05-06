using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace BasicCrud.Functions.Repositories;

public interface IEntityRepo
{
    Task<IEnumerable<object>> GetEntities(CancellationToken cancellationToken);
    Task<ItemResponse<object>> CreateEntity(object value, CancellationToken cancellationToken);
}

public class EntityRepo : IEntityRepo
{
    private readonly IRepoClient _repoClient;
    private readonly ILogger<EntityRepo> _logger;

    public EntityRepo(IRepoClient repoClient, ILogger<EntityRepo> logger)
    {
        _repoClient = repoClient;
        _logger = logger;
    }

    public async Task<IEnumerable<object>> GetEntities(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting entities");
        var container = _repoClient.Client.GetContainer(Constants.DatabaseId, Constants.EntityContainerId);
        var query = container.GetItemQueryIterator<object>("SELECT * FROM c");
        var results = new List<object>();
        while (query.HasMoreResults)
        {
            _logger.LogInformation("Query has results {CurrentCount}", results.Count);
            var response = await query.ReadNextAsync(cancellationToken);
            results.AddRange(response);
        }

        return results;
    }

    public async Task<ItemResponse<object>> CreateEntity(object value, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating entity, value: {Value}", value);
        var container = _repoClient.Client.GetContainer(Constants.DatabaseId, Constants.EntityContainerId);
        var response = await container.CreateItemAsync(value, cancellationToken: cancellationToken);
        _logger.LogInformation("Created entity, response: {Response}", response);
        return response;
    }
}
