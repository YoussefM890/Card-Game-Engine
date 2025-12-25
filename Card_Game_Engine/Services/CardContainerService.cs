using System.Text;
using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Enums;
using CreateNamespace = Card_Game_Engine.Models.CreateGame.Classes;

namespace Card_Game_Engine.Services;

public class CardContainerService
{
    private List<GridItem> _grid;
    private int _height;
    private int _width;

    public CardContainerService(Room room)
    {
        _grid = room.Grid;
    }

    public void SetStartingDeck(List<CreateNamespace.Card> startingDeck, int startingPosition = 0)
    {
        // Validate that the grid has been initialized and position is valid
        if (_grid == null || _grid.Count == 0)
        {
            throw new InvalidOperationException(
                "Grid must be initialized before setting starting deck. Call ClearAndCreateEmptyGrid first.");
        }

        if (startingPosition < 0 || startingPosition >= _grid.Count)
        {
            throw new ArgumentOutOfRangeException(nameof(startingPosition),
                $"Starting position {startingPosition} is out of range. Grid has {_grid.Count} items.");
        }

        var startingPositionVisibility = (CardVisibilityEnum)_grid[startingPosition].Visibility;
        _grid[startingPosition].Cards = startingDeck
            .Select((createCard, index) => createCard.ToGlobalCard(index + 1, null, startingPositionVisibility))
            .ToList();
    }

    public List<GridItem> DeepCopy()
    {
        return _grid.Select(item => item.DeepCopy()).ToList();
    }

    public void ClearAndCreateEmptyGrid(int width, int height, Dictionary<int, CreateNamespace.GridItem> createGrid)
    {
        _width = width;
        _height = height;
        _grid.Clear();
        foreach (var i in Enumerable.Range(1, height))
        {
            foreach (var j in Enumerable.Range(1, width))
            {
                var gridItem = createGrid.GetValueOrDefault(_grid.Count);
                _grid.Add(new GridItem(_grid.Count, gridItem?.Visibility, gridItem?.VisibleTo));
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