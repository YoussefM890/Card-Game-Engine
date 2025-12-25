using System.Text.Json;
using System.Text.Json.Serialization;

namespace Card_Game_Engine.Utils.Global;

public sealed class FlexibleStringConverter : JsonConverter<string?>
{
    public override string? Read(ref Utf8JsonReader r, Type t, JsonSerializerOptions o)
        => r.TokenType switch
        {
            JsonTokenType.StartArray => string.Join(",",
                JsonDocument.ParseValue(ref r).RootElement.EnumerateArray().Select(x =>
                    x.ValueKind == JsonValueKind.String ? x.GetString() : x.GetRawText())),
            JsonTokenType.String => r.GetString(),
            // JsonTokenType.Number     => r.GetRawText(),
            JsonTokenType.True => "true",
            JsonTokenType.False => "false",
            JsonTokenType.Null => null,
            _ => JsonDocument.ParseValue(ref r).RootElement.ToString()
        };

    public override void Write(Utf8JsonWriter w, string? v, JsonSerializerOptions o) => w.WriteStringValue(v);
}