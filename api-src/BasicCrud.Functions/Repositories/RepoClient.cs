using BasicCrud.Functions.Options;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BasicCrud.Functions.Repositories;

public interface IRepoClient
{
    CosmosClient Client { get; }
}

public class RepoClient : IRepoClient
{
    private readonly CosmosClient _client;
    private readonly ILogger<RepoClient> _logger;

    public CosmosClient Client
    {
        get
        {
            _logger.LogInformation("Providing CosmosClient");
            return _client;
        }
    }

    public RepoClient(IOptions<CosmosDbOptions> options, ILogger<RepoClient> logger)
    {
        _logger = logger;
        _logger.LogInformation("RepoClient constructor called");

        var clientOptions = new CosmosClientOptions
        {
            ApplicationRegion = Constants.Region
        };

        _client = new CosmosClient(options.Value.AccountEndpoint, options.Value.AccountKey, clientOptions);
    }
}
