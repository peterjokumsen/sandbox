namespace BasicCrud.Functions.Options;

public class CosmosDbOptions
{
    public const string Key = "CosmosDb";
    public string AccountEndpoint { get; set; } = null!;
    public string AccountKey { get; set; } = null!;
}
