namespace Card_Game_Engine.Utils.Global;

public class ReflectionUtils
{
    public static object GetPropertyValue<T>(T item, string propertyName)
    {
        // Using reflection to get the property value
        return item.GetType().GetProperty(propertyName).GetValue(item);
    }
}