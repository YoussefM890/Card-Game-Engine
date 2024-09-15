using Card_Game_Engine.Models.Filter.Enums;
using Card_Game_Engine.Models.Global.Classes;

namespace Card_Game_Engine.Models.Filter.Constants;

public class Properties
{
    private static readonly Dictionary<FilterEnum, Dictionary<PropertyEnum, string>> PropertyNames = new()
    {
        {
            FilterEnum.Card, new Dictionary<PropertyEnum, string>
            {
                { PropertyEnum.Suit, nameof(Card.Suit) },
                { PropertyEnum.FaceValue, nameof(Card.FaceValue) }
            }
        },
    };

    public static string GetPropertyName(FilterEnum filterType, PropertyEnum reference)
    {
        if (PropertyNames.TryGetValue(filterType, out var filterMapping) &&
            filterMapping.TryGetValue(reference, out var propertyName))
        {
            return propertyName;
        }

        throw new ArgumentException(
            $"No property mapping found for filter type: {filterType} and reference: {reference}");
    }
}