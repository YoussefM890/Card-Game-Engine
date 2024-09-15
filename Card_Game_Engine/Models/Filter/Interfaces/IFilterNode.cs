using Card_Game_Engine.Models.Filter.Enums;

namespace Card_Game_Engine.Models.Filter.Interfaces;

public interface IFilterNode
{
    LogicalOperatorEnum? LogicalOperator { get; set; }
}