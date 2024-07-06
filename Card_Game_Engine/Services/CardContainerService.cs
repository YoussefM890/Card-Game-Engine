using System.Text;
using Card_Game_Engine.Models;

namespace Card_Game_Engine.Services;

public class CardContainerService
{
    private List<GridItem> _grid;
    private int _height;
    private int _width;

    public CardContainerService(List<GridItem> grid)
    {
        _grid = grid;
    }

    public void SetStartingDeck(List<Card> startingDeck, int startingPosition = 0)
    {
        _grid[startingPosition].Cards = startingDeck;
    }

    public List<GridItem> DeepCopy()
    {
        return _grid.Select(item => item.DeepCopy()).ToList();
    }

    public void ClearAndCreateEmptyGrid(int width, int height)
    {
        _width = width;
        _height = height;
        _grid.Clear();
        foreach (var i in Enumerable.Range(1, height)) // 7 rows
        {
            foreach (var j in Enumerable.Range(1, width)) // 12 columns
            {
                _grid.Add(new GridItem(_grid.Count));
            }
        }
    }

    public override string ToString()
    {
        var builder = new StringBuilder();
        foreach (var item in _grid)
        {
            builder.AppendLine(
                $"{item.Id}: [{string.Join(", ", item.Cards.Select(card => $"Id: {card.Id}"))}]");
        }

        return builder.ToString();
    }

    public int GetWidth()
    {
        return _width;
    }

    public int GetHeight()
    {
        return _height;
    }
}