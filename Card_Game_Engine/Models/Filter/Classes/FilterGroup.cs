using Card_Game_Engine.Models.Filter.Enums;
using Card_Game_Engine.Models.Filter.Interfaces;

namespace Card_Game_Engine.Models.Filter.Classes;

public class FilterGroup : IFilterNode
{
    public List<IFilterNode> Children { get; set; } = new List<IFilterNode>();
    public LogicalOperatorEnum? LogicalOperator { get; set; }
}