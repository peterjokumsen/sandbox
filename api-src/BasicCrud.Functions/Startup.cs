using BasicCrud.Functions.Options;
using BasicCrud.Functions.Repositories;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(BasicCrud.Functions.Startup))]

namespace BasicCrud.Functions;

public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder.Services.AddOptions<CosmosDbOptions>()
            .Configure<IConfiguration>((settings, config) =>
            {
                config.GetSection(CosmosDbOptions.Key).Bind(settings);
            });

        builder.Services.AddSingleton<IRepoClient, RepoClient>();
        builder.Services.AddSingleton<IEntityRepo, EntityRepo>();
    }
}
