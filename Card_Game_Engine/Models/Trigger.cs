namespace Card_Game_Engine.Models;

public class Trigger
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public Dictionary<string, object> Parameters { get; private set; }

    public Trigger(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
        Parameters = new Dictionary<string, object>();
    }

    // Add parameters to the trigger
    public void AddParameter(string key, object value)
    {
        Parameters[key] = value;
    }

    // Retrieve a parameter
    public object GetParameter(string key)
    {
        if (Parameters.ContainsKey(key))
        {
            return Parameters[key];
        }

        return null;
    }
}