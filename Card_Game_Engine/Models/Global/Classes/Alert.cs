using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

public class Alert
{
    public Alert(string message, AlertTypeEnum type)
    {
        Message = message;
        Type = type;
    }

    public string Message { get; set; }
    public AlertTypeEnum Type { get; set; }
}