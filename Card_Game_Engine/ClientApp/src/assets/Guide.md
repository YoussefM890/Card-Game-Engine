# Card Game Engine (CGE) Guide

Welcome to the **Card Game Engine (CGE)**! This guide will help you navigate the process of creating and playing custom card games with ease.

---

## Getting Started

### Creating a Room

1. **Create a Room**: Click on the `Create Room` button.
2. **Note the Room ID**: Your unique Room ID will appear at the top of the screen.
3. **Invite a Friend**: Share the Room ID with a friend to join as Player 2.

### Setting Up the Game Board

#### Select Cards

- **Choose Suits**: In the top-right corner, check the boxes for the suits you want (Hearts, Diamonds, Clubs, Spades).
- **Add Card Values**: Click on the card values (Ace, Two, Three, etc.) to include them in your deck.
- **View Selected Cards**: Selected cards will appear in a line at the top.
- **Remove Cards**: Click on any card in the top line to remove it from your deck.

#### Define the Grid

- **Set Grid Size**: Adjust the `Width` and `Height` controls to set your desired grid size (e.g., 9x5).
- **Grid Reference**: Each cell in the grid is numbered, making it easier to reference in your game rules.
- **Set Cell Visibility**: Define the default visibility for each cell:
  - **Visibility Options**:
    - **Visible to All (Green)**: Cells are visible to all players.
    - **Visible to Player 1 (Blue)**: Cells are visible only to Player 1.
    - **Visible to Player 2 (Yellow)**: Cells are visible only to Player 2.
    - **Hidden (Red)**: Cells are hidden from both players.
  - **How to Set Visibility**:
    1. **Select Visibility**: Click on the desired visibility option from the list next to the grid.
    2. **Apply to Cells**: Click on the cells in the grid to apply the selected visibility. The cell will be colored according to the visibility setting.
    3. **Default Visibility**: If no color is set, cells are visible by default.

#### Set Card Visibility

- **Visibility Options**: Define visibility for different areas—Visible, Hidden, Player 1, or Player 2.

### Adding Manual Triggers

Manual triggers allow you to create custom buttons that can trigger actions during the game.

1. **Add Manual Trigger**: Click on the `Add Manual Trigger` button in the top-left bar.
2. **Configure Manual Trigger**:

- **Name**: Enter a name for the manual trigger button.
- **Description**: Provide a brief description of what the trigger does.
- **Visibility**: Set who can see and use the trigger:
  - **Visible to All (Green)**: Both players can see and use the trigger.
  - **Visible to Player 1 (Blue)**: Only Player 1 can see and use the trigger.
  - **Visible to Player 2 (Yellow)**: Only Player 2 can see and use the trigger.
  - **Hidden (Red)**: The trigger is hidden from both players.

3. **Limit**: You can add up to 6 manual triggers.

### Using Manual Triggers in Rules

- Each manual trigger you create will appear as a trigger option in your rules, with its name followed by "(Manual)".
- You can select these manual triggers when setting up your game rules, allowing players to trigger specific actions by clicking the manual trigger buttons during gameplay.

---

## Creating Game Rules

### Overview

Rules in CGE consist of **Triggers**, **Actions**, and optional **Inner Rules**. You can create multiple rules to design complex game logic.

### Adding a Rule

- Click **Add Rule** to begin creating a new rule.

### Setting Up Triggers

- **Available Triggers**:
  - **Game Start**: Triggered when the game begins.
  - **Card Moved**: Triggered when a card is moved.
  - **Deck Card Count**: Triggered based on the number of cards in specific positions.
  - **Score**: Triggered based on player scores.
  - **Formula Trigger**: Triggers when a specified condition evaluates to true.
  - **Manual Triggers**: Any manual triggers you've added will appear here (e.g., "Draw Card (Manual)").

### Adding Actions

- **Available Actions**:
  - **Shuffle Deck**: Shuffle cards in specific positions.
  - **Move Cards**: Move cards from one position to another.
  - **Add Score**: Add points to a player's score.
  - **Set Score**: Set a player's score to a specific value.

### Using Inner Rules

- **Add Inner Rules**: Click **Add Inner Rule** within an existing rule.
- **Create Complex Logic**: Inner rules allow you to implement "AND" logic within a parent rule, combining multiple conditions.
- **Important Note**: Inner rules evaluate based on the initial state of the game when the parent rule is triggered. Actions executed by the parent rule do not affect the inner rules during that execution cycle.

---

## Detailed Trigger Explanations

### Game Start

- **No Parameters**: This trigger activates when the game begins.

### Card Moved

- **Parameters**:
  - **From Position**: Specify where the card was moved from.
  - **To Position**: Specify where the card was moved to.
  - **Card Count**: Specify how many cards were moved.

### Deck Card Count

- **Parameters**:
  - **Positions**: Select the positions (e.g., specific grid cells or decks) to monitor.
  - **Card Filter**: (Optional) Apply a filter to count only specific cards within the selected positions. Click the button in the field to open a user-friendly interface for creating the filter.
  - **Comparison**: Choose a comparison operator and provide a value:
    - **Equal To**: Trigger when the count is equal to the specified value.
    - **Not Equal To**: Trigger when the count is not equal to the specified value.
    - **Greater Than**: Trigger when the count is greater than the specified value.
    - **Less Than**: Trigger when the count is less than the specified value.
  - **Positions Relation**: Useful when selecting multiple positions to help the system decide when to trigger:
    - **Sum**: Combine the counts from all selected positions.
    - **Any**: The trigger activates if any one of the selected positions meets the condition.
    - **All**: The trigger activates only if all selected positions meet the condition.

### Score

- **Parameters**:
  - **Score Type**: Choose between Player 1, Player 2, Highest, Lowest, Any, All, or Difference.
  - **Comparison**: Choose a comparison (Equal To, Not Equal To, Less Than, Greater Than) and provide a value to compare against.
  - **Trigger Behavior**: Choose when the trigger activates (**On Change**, **Continuous**).

### Formula Trigger

- **Parameter:**
  - **Condition**: A formula-like expression that must evaluate to `true` for the trigger to activate.
  - **Example:** `root.positions.at(9).cards.at(0).rank.biggerThan(root.positions.at(14).cards.at(0).rank)`
  - **Usage:** This trigger allows highly customizable conditions to determine when a rule should be activated.

### Manual Triggers

- **Parameters**:
  - **Trigger Name**: Select the manual trigger you've created (e.g., "Draw Card (Manual)").
  - **Description**: These triggers activate when the corresponding manual trigger button is clicked during gameplay.

---

## Detailed Action Explanations

### Shuffle Deck

- **Parameter**:
  - **At Positions**: Specify positions to shuffle.

### Move Cards

- **Parameters**:
  - **From Position/Positions**: Specify where to move cards from.
  - **To Position/Positions**: Specify where to move cards to.
  - **Card Count**: Indicate how many cards to move (0 for all).
  - **Visibility**:
    - **Keep**: The card retains its current visibility state.
    - **Cell**: The card adopts the visibility setting of the destination cell.
    - **Visible to All (Green)**: The card is visible to both players, regardless of cell visibility.
    - **Private (Yellow)**: The card is visible only to the player who moved it.
    - **Hidden (Red)**: The card is hidden from both players.

### Add Score

- **Parameters**:
  - **Value to Add**: Enter how much to add to the score.
  - **Player**: Select which player's score to modify.

### Set Score

- **Parameters**:
  - **New Score**: Enter the new score value.
  - **Player**: Select which player's score to set.

---

## Tips for Creating Rules

- **Start Simple**: Begin with basic rules and gradually add complexity.
- **Use Inner Rules**: Apply inner rules for conditions requiring "AND" logic.
- **Test Thoroughly**: Regularly test your rules to ensure they work as intended.
- **Understand Logic**: Remember, multiple triggers within a rule work as "OR" logic, while inner rules enable "AND" logic.
- **Avoid Infinite Loops**: Be cautious when creating rules that could trigger each other indefinitely. Currently, the system does not prevent infinite loops automatically.
- **Duplicate Actions**: For the same game state, an action with the same name and parameters will only execute once, even if you've added it multiple times in your rules.

---

## Starting the Game

1. **Ready to Play**: Once your rules are set, click `Navigate To Play` to begin.
2. **Player Assignment**: The room creator becomes Player 1, and the friend who joined becomes Player 2.
3. **Invite Another Player**: After creating the game, you can invite another player to play with you (currently only 2-player games are allowed).
4. **Automatic Transition**: After submitting the game setup, you will be automatically transferred to the play game page.
5. **Start Game**: Click the `Start Game` button to begin the game.
6. **Scores and Manual Triggers**: The scores are displayed on the top bar (middle), and manual triggers are on the top bar (right side). Note: The manual triggers will display after starting the game.

---

## During Gameplay

### Viewing Decks

- Players can see the top card of each deck.

### Moving Cards

1. **Select a Card**: Click on the position where the card is located (currently, you can only move the top card).
2. **Choose Visibility**: On the left middle side of the screen, you will see five visibility options:

- **Cell (Blue)**: The card will take the same visibility as the destination cell defined in the game setup. This is the default and most commonly used option.
- **Keep (Gray)**: The card will keep its current visibility state.
- **Visible to All (Green)**: The card will be visible to both players, regardless of cell visibility.
- **Private (Yellow)**: The card will be visible only to you.
- **Hidden (Red)**: The card will be hidden from both players.

3. **Set Visibility**:

- **Select Visibility**: Before moving the card, select the desired visibility option from the list on the left middle side of the screen.
- **Visual Indicator**: When you select a card, it will have a shadow indicating the selected visibility option.
- **Move the Card**: Click on the destination to move the card there with the selected visibility.

4. **Manual Triggers**: Use manual triggers to perform custom actions you've defined.

---

## Ending the Game

- **Exit the Room**: Use the `Leave Room` button to exit when finished.

---

## Notes

1. **No Constraints on Moves**: Currently, the game lacks constraints, so anyone can move any card at any time. The rules of the game should be agreed upon between the two players.
2. **Inner Rules Evaluation**: Inner rules trigger based on the initial state of the parent rule, meaning they do not consider any actions executed by the parent action during that execution cycle.
3. **Be Careful with Infinite Loops**: The system does not prevent infinite loops automatically. Ensure your rules do not create unintended loops.
4. **Duplicate Actions Execution**: For the same game state, an action with the same name and parameters will only execute once, even if you've added it multiple times in your rules.

---

## Additional Notes

- **Game Customization**: CGE offers extensive customization but does not enforce specific game rules. Players must adhere to agreed-upon rules to ensure fair play.
- **Feedback and Suggestions**: If you have ideas for new features or improvements, consider reaching out to the CGE development team.

---

Enjoy building and playing your custom games with CGE!
