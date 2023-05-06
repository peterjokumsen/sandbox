using System;
using System.Dynamic;
using Newtonsoft.Json;

namespace BasicCrud.Functions.Models;

public class Entity : DynamicObject
{
    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [JsonProperty(PropertyName = "value")]
    public object Value { get; set; }
}
