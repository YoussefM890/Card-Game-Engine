using Card_Game_Engine.Models.Filter.Enums;
using Card_Game_Engine.Models.Filter.Interfaces;

namespace Card_Game_Engine.Models.Filter.Classes;

public class FilterCondition : IFilterNode
{
    public PropertyEnum PropertyId { get; set; }
    public OperatorEnum Operator { get; set; }
    public string Value { get; set; }
    public LogicalOperatorEnum? LogicalOperator { get; set; }
}