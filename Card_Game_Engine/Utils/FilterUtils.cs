using Card_Game_Engine.Models.Filter.Classes;
using Card_Game_Engine.Models.Filter.Constants;
using Card_Game_Engine.Models.Filter.Enums;
using Card_Game_Engine.Utils.Global;

namespace Card_Game_Engine.Utils;

public static class FilterUtils
{
    public static IEnumerable<T> ApplyFilter<T>(
        IEnumerable<T> source,
        string filterString,
        FilterEnum filterType
    )
    {
        var filter = DeserializeFilter(filterString);
        return source.Where(item => EvaluateGroup(item, filter, filterType));
    }

    private static FilterGroup DeserializeFilter(string filterString)
    {
        var filterList = filterString.Split(',');
        var index = 1;
        var root = new FilterGroup();
        var stack = new Stack<FilterGroup>();
        stack.Push(root);

        while (stack.Count > 0 && index < filterList.Length)
        {
            var currentGroup = stack.Peek();
            var currentChar = filterList[index];

            if (currentChar == "(")
            {
                var newGroup = new FilterGroup();
                currentGroup.Children.Add(newGroup);
                stack.Push(newGroup);
            }
            else if (currentChar == ")")
            {
                if (index + 1 < filterList.Length && filterList[index + 1] != ")")
                {
                    currentGroup.LogicalOperator = (LogicalOperatorEnum)int.Parse(filterList[index + 1]);
                    index++;
                }

                stack.Pop();
            }
            else
            {
                var condition = new FilterCondition
                {
                    PropertyId = Enum.Parse<PropertyEnum>(filterList[index]),
                    Operator = (OperatorEnum)int.Parse(filterList[index + 1]),
                    Value = filterList[index + 2]
                };

                var hasLogicalOperator = index + 3 < filterList.Length && filterList[index + 3] != ")";
                if (hasLogicalOperator)
                {
                    condition.LogicalOperator = (LogicalOperatorEnum)int.Parse(filterList[index + 3]);
                    index += 3;
                }
                else
                {
                    condition.LogicalOperator = null;
                    index += 2;
                }

                currentGroup.Children.Add(condition);
            }

            index++;
        }

        if (stack.Count > 0 || !root.Children.Any())
        {
            throw new ArgumentException("Invalid filter string");
        }

        return root;
    }


    private static bool EvaluateGroup<T>(T item, FilterGroup group, FilterEnum filterType)
    {
        bool result = true;
        bool isFirstCondition = true;
        LogicalOperatorEnum prevLogicalOperator = LogicalOperatorEnum.Or;

        foreach (var child in group.Children)
        {
            bool childResult = child switch
            {
                FilterGroup childGroup => EvaluateGroup(item, childGroup, filterType),
                FilterCondition condition => EvaluateCondition(item, condition, filterType),
                _ => throw new ArgumentException("Invalid filter node type")
            };

            if (isFirstCondition)
            {
                result = childResult;
                isFirstCondition = false;
                prevLogicalOperator = child.LogicalOperator ?? LogicalOperatorEnum.And;
            }
            else
            {
                result = ApplyLogicalOperator(result, childResult, prevLogicalOperator);
                prevLogicalOperator = child.LogicalOperator ?? LogicalOperatorEnum.And;
            }
        }

        return result;
    }

    private static bool EvaluateCondition<T>(T item, FilterCondition condition, FilterEnum filterType)
    {
        var reference = (PropertyEnum)(condition.PropertyId);
        var propertyName = Properties.GetPropertyName(filterType, reference);
        var propertyValue = ReflectionUtils.GetPropertyValue(item, propertyName);
        var conditionValue = condition.Value;
        var operatorFunc = Operators.GetOperatorFunc(condition.Operator);

        return operatorFunc(propertyValue, conditionValue);
    }

    private static bool ApplyLogicalOperator(bool left, bool right, LogicalOperatorEnum op)
    {
        return op switch
        {
            LogicalOperatorEnum.And => left && right,
            LogicalOperatorEnum.Or => left || right,
            _ => throw new ArgumentException("Invalid logical operator")
        };
    }
}