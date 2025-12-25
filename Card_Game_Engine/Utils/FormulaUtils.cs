using System.Text;
using Card_Game_Engine.Models.Global.Classes;

namespace Card_Game_Engine.Utils;

public class RootType
{
    public RootType(List<GridItem> cardContainer, List<Player> players)
    {
        CardContainer = cardContainer;
        Players = players;
    }

    public List<GridItem> CardContainer { get; }
    public List<Player> Players { get; }
}

public record ChainStep(string MethodName, List<string> Parameters);

enum MethodEnum
{
    GetPositions = 0,
    GetCards = 1,
    At = 2,
    GetSuit = 3,
    GetRank = 4,
    Equals = 5,
    BiggerThan = 6,
    SmallerThan = 7,
    BiggerOrEqual = 8,
    SmallerOrEqual = 9,
    Different = 10,
}

public class FormulaUtils
{
    /// <summary>
    /// Tokenizes the input string using the given open/close delimiters and separator.
    /// It ignores separators that are inside groups.
    /// </summary>
    public static List<string> Tokenize(
        string input,
        char open,
        char close,
        char separator)
    {
        if (input == null)
            throw new ArgumentNullException(nameof(input));

        List<string> tokens = new List<string>();
        StringBuilder token = new StringBuilder();
        int depth = 0;

        for (int i = 0; i < input.Length; i++)
        {
            char c = input[i];

            // If we encounter the separator while not inside a delimited group, split here.
            if (c == separator && depth == 0)
            {
                tokens.Add(token.ToString());
                token.Clear();
                continue;
            }

            // Append the character to the current token.
            token.Append(c);

            // If the character is an opening delimiter, increment the depth.
            if (c == open)
            {
                depth++;
            }
            // If it's a closing delimiter, decrement the depth.
            else if (c == close)
            {
                depth--;
            }
        }

        // Add any remaining characters as the final token.
        tokens.Add(token.ToString());
        return tokens;
    }

    /// <summary>
    /// Converts a list of tokens into a structured list of chain steps.
    /// Each step consists of a method name and (optionally) a parameter group.
    /// If the next token starts with '(', it is taken as the parameters for the current method.
    /// </summary>
    public static List<ChainStep> ConvertChainListToObject(List<string> tokens)
    {
        List<ChainStep> steps = new List<ChainStep>();
        for (int i = 0; i < tokens.Count; i++)
        {
            string token = tokens[i].Trim();
            //Skip empty tokens or parameter groups.
            if (string.IsNullOrEmpty(token) || token.StartsWith("("))
                continue;

            //the token is a method name.
            string methodName = token;
            List<string> parameters = new List<string>();
            // Check if the next token exists and starts with '('—if so, it's the parameter group.
            if (i + 1 < tokens.Count && tokens[i + 1].Trim().StartsWith("("))
            {
                string paramToken = tokens[i + 1].Trim();
                // Remove the surrounding parentheses.
                if (paramToken.StartsWith("(") && paramToken.EndsWith(")"))
                {
                    paramToken = paramToken.Substring(1, paramToken.Length - 2);
                }

                // Tokenize the parameters (again using ';' as separator).
                parameters = Tokenize(paramToken, '{', '}', ';')
                    .Where(s => !string.IsNullOrWhiteSpace(s))
                    .ToList();
                i++; // Skip the parameter token.
            }

            steps.Add(new ChainStep(methodName, parameters));
        }

        return steps;
    }

    public static object? InvokeMethod(object? current, string methodName, object[] evaluatedParams)
    {
        MethodEnum methodEnum;

        // Try parsing the methodName as an integer first.
        if (int.TryParse(methodName, out int methodId))
        {
            methodEnum = (MethodEnum)methodId;
        }
        else
        {
            // Otherwise, parse the methodName as the enum name (ignoring case).
            methodEnum = Enum.Parse<MethodEnum>(methodName, true);
        }

        switch (methodEnum)
        {
            case MethodEnum.GetPositions:
                return GetPositions(current, evaluatedParams);
            case MethodEnum.At:
                return At(current, evaluatedParams);
            case MethodEnum.GetCards:
                return GetCards(current, evaluatedParams);
            case MethodEnum.GetRank:
                return GetRank(current, evaluatedParams);
            case MethodEnum.Equals:
                return Equals(current, evaluatedParams);
            case MethodEnum.BiggerThan:
                return BiggerThan(current, evaluatedParams);
            case MethodEnum.SmallerThan:
                return SmallerThan(current, evaluatedParams);
            case MethodEnum.BiggerOrEqual:
                return BiggerOrEqual(current, evaluatedParams);
            case MethodEnum.SmallerOrEqual:
                return SmallerOrEqual(current, evaluatedParams);
            case MethodEnum.Different:
                return Different(current, evaluatedParams);
            default:
                throw new NotImplementedException($"Method {methodName} is not implemented.");
        }
    }

    // Example method: GetPositions
    // If 'current' is null, this is a static call starting from the root.
    private static List<GridItem> GetPositions(
        object? current,
        object[] evaluatedParams
    )
    {
        if (current is RootType root)
        {
            return root.CardContainer;
        }

        throw new Exception("Invalid context for 'GetPositions' method. Expected a RootType.");
    }

    // Example method: At
    // We assume 'current' is a list-like object, and evaluatedParams[0] is an index.
    private static object At(
        object current,
        object[] evaluatedParams)
    {
        if (current is System.Collections.IList list && evaluatedParams.Length > 0)
        {
            int index = Convert.ToInt32(evaluatedParams[0]);
            if (index >= 0 && index < list.Count)
                return list[index];
            return null;
        }

        throw new Exception("Invalid context for 'At' method. Expected a list-like object.");
    }

    // Example method: GetCards
    // Here we simply return the afterActionCardContainer.
    private static List<Card> GetCards(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is GridItem gridItem)
            return gridItem.Cards;
        throw new Exception("Invalid context for 'GetCards' method. Expected a GridItem.");
    }

    private static int GetRank(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is Card card)
            return card.FaceValue;
        throw new Exception("Invalid context for 'GetRank' method. Expected a Card.");
    }

    private static bool Equals(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is int currentInt && evaluatedParams.Length > 0)
            return currentInt == Convert.ToInt32(evaluatedParams[0]);
        throw new Exception("Invalid context for 'Equals' method. Expected two integers.");
    }

    private static bool BiggerThan(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is int currentInt && evaluatedParams.Length > 0)
            return currentInt > Convert.ToInt32(evaluatedParams[0]);
        throw new Exception("Invalid context for 'BiggerThan' method. Expected two integers.");
    }

    private static bool SmallerThan(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is int currentInt && evaluatedParams.Length > 0)
            return currentInt < Convert.ToInt32(evaluatedParams[0]);
        throw new Exception("Invalid context for 'SmallerThan' method. Expected two integers.");
    }

    private static bool BiggerOrEqual(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is int currentInt && evaluatedParams.Length > 0)
            return currentInt >= Convert.ToInt32(evaluatedParams[0]);
        throw new Exception("Invalid context for 'BiggerOrEqual' method. Expected two integers.");
    }

    private static bool SmallerOrEqual(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is int currentInt && evaluatedParams.Length > 0)
            return currentInt <= Convert.ToInt32(evaluatedParams[0]);
        throw new Exception("Invalid context for 'SmallerOrEqual' method. Expected two integers.");
    }

    private static bool Different(
        object current,
        object[] evaluatedParams
    )
    {
        if (current is int currentInt && evaluatedParams.Length > 0)
            return currentInt != Convert.ToInt32(evaluatedParams[0]);
        throw new Exception("Invalid context for 'Different' method. Expected two integers.");
    }
}