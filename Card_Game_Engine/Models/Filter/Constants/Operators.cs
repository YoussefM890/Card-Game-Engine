using Card_Game_Engine.Models.Filter.Enums;

namespace Card_Game_Engine.Models.Filter.Constants;

public class Operators
{
    public static Func<dynamic, string, bool> GetOperatorFunc(OperatorEnum op)
    {
        return (a, b) => op switch
        {
            // Integer comparisons
            OperatorEnum.EqualTo => (int)a == int.Parse(b),
            OperatorEnum.NotEqualTo => (int)a != int.Parse(b),
            OperatorEnum.GreaterThan => (int)a > int.Parse(b),
            OperatorEnum.LessThan => (int)a < int.Parse(b),
            OperatorEnum.GreaterThanOrEqualTo => (int)a >= int.Parse(b),
            OperatorEnum.LessThanOrEqualTo => (int)a <= int.Parse(b),

            // 'In' and 'Not In' comparisons
            //to implement
            _ => throw new NotImplementedException($"Operator {op} not implemented")
        };
    }
}