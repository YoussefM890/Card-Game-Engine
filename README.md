# Current UI
## Home (from v0.18)
![image](https://github.com/user-attachments/assets/5d9e8e9f-5759-4601-8345-6153051b53ae)
## Create Game (from v0.22)
![image](https://github.com/user-attachments/assets/02c2d4df-ea1d-4a12-b53c-b0aa35c2b2f1)
## Play Game (from v0.22)
![image](https://github.com/user-attachments/assets/16321f13-3f34-433b-bb14-1e4c2a44518b)
## Add Manual Triggers (from v0.22)
![image](https://github.com/user-attachments/assets/1f8b6401-63d4-487f-8583-6d8d001930e1)
## Edit Players (from v0.22)
![image](https://github.com/user-attachments/assets/8b57f8ea-2606-4b2f-9767-c7eee86e92b3)
## Assign Players (from v0.22)
![image](https://github.com/user-attachments/assets/0033a935-e0f6-4810-a04c-6ff49e5c3e40)
## Import Game Setup (from v0.16)
![image](https://github.com/user-attachments/assets/f6285799-2301-416b-b24e-ea6838302a1f)
## Positions Selector (from v0.17)
![image](https://github.com/user-attachments/assets/cdaecddf-d298-4324-87f3-8215538a482e)
## Card Filter (from v0.20)
![image](https://github.com/user-attachments/assets/3bc6cca0-3f40-4b57-bc7a-a6570797e627)
## Formula Builder (from v0.21)
![image](https://github.com/user-attachments/assets/5c24ba6f-9038-4e0f-bd8c-96cf2d5f9ea7)
## Guide (from v0.20)
![image](https://github.com/user-attachments/assets/c0dc75b2-a859-4ced-88ed-648477a41e79)

# Card Game Engine (CGE) Guide

Welcome to the **Card Game Engine (CGE)**! This guide will help you navigate the process of creating and playing custom multiplayer card games with ease.

---

## Getting Started

### Creating a Room

1. **Create a Room**: Click on the `Create Room` button.
2. **Note the Room ID**: Your unique Room ID will appear at the top of the screen.
3. **Invite Friends**: Share the Room ID with friends to have them join the room.

### Setting Up Players

#### Understanding Players vs Users

In CGE, **players** and **users** are separate concepts:
- **Players**: Game positions created by the room creator (e.g., "Dealer", "Player 1", "North", "South"). These are permanent parts of your game setup.
- **Users**: People who connect to your room (shown as User 1, User 2, etc.). They can be assigned to players or remain as spectators.

#### Defining Players

1. **Edit Players**: Click the `Edit Players` button during game setup.
2. **Add Players**: Click `Add Player` to create a new player.
3. **Configure Each Player**:
- **Name/Role**: Enter a name or role identifier (defaults to "Player 1", "Player 2", etc.). This can describe the role (e.g., "Dealer", "Attacker") or just be a player number.
- **Description**: Add an optional description of the player.
- **Perspective**: Choose the viewing angle for this player:
    - **Top**: Views the grid from the top
    - **Bottom**: Views the grid from the bottom
    - **Left**: Views the grid from the left side
    - **Right**: Views the grid from the right side

4. **Maximum Players**: You can create up to 6 players.

### Setting Up the Game Board

#### Select Cards

- **Choose Suits**: In the top-right corner, check the boxes for the suits you want (Hearts, Diamonds, Clubs, Spades).
- **Add Card Values**: Click on the card values (Ace, Two, Three, etc.) to include them in your deck.
- **View Selected Cards**: Selected cards will appear in a line at the top.
- **Remove Cards**: Click on any card in the top line to remove it from your deck.

#### Define the Grid

- **Set Grid Size**: Adjust the `Width` and `Height` controls to set your desired grid size (e.g., 9x5).
- **Grid Reference**: Each cell in the grid is numbered, making it easier to reference in your game rules.

#### Set Cell Visibility

Define which players can see each cell by default:

1. **Visibility Options**: You'll see a list of buttons representing:
- **All Players (Green)**: Cell is visible to all players
- **No Players (Red)**: Cell is hidden from all players
- **Individual Players**: Each player you created (shown with unique gradient colors)

2. **Apply Visibility to Cells**:
- Click on a visibility option button to select it
- Click on grid cells to apply that visibility setting
- Cells use gradient conic coloring to show which players can see them

3. **Multi-Player Visibility**:
- You can make a cell visible to multiple specific players
- Select a player option button (it stays selected)
- Click on cells to toggle that player's visibility:
    - If the player isn't in the cell's visibility list, clicking adds them (their color appears in the gradient)
    - If the player is already in the cell's visibility list, clicking removes them (their color disappears from the gradient)
- The cell's color displays a gradient combining all assigned player colors

4. **Modifying Visibility**:
- To remove a player from "All Players" visibility: Select that specific player and click the green cell. It will now be visible to all players *except* that one.

### Adding Manual Triggers

Manual triggers allow you to create custom buttons that can trigger actions during the game.

1. **Add Manual Trigger**: Click on the `Add Manual Trigger` button in the top-left bar.
2. **Configure Manual Trigger**:
- **Name**: Enter a name for the manual trigger button.
- **Description**: Provide a brief description of what the trigger does.
- **Visible To**: Multi-select which players can see and use the trigger. You can select multiple players, making the trigger visible only to those players.

3. **Limit**: You can add up to 6 manual triggers.

### Using Manual Triggers in Rules

- Each manual trigger you create will appear as a trigger option in your rules, with its name followed by "(Manual)".
- You can select these manual triggers when setting up your game rules, allowing assigned players to trigger specific actions by clicking the manual trigger buttons during gameplay.

---

## Creating Game Rules

### Overview

Rules in CGE consist of **Triggers**, **Actions**, and optional **Inner Rules**. You can create multiple rules to design complex game logic that works with any number of players.

### Adding a Rule

- Click **Add Rule** to begin creating a new rule.

### Setting Up Triggers

- **Available Triggers**:
    - **Game Start**: Triggered when the game begins.
    - **Card Moved**: Triggered when a card is moved.
    - **Deck Card Count**: Triggered based on the number of cards in specific positions.
    - **Score (Single Player)**: Triggered based on a specific player's score.
    - **Score (Group Aggregate)**: Triggered based on aggregate calculations across multiple players (Max, Min, Sum, Average, Any, All).
    - **Score (Pairwise Difference)**: Triggered based on the difference between two players' scores.
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

### Score (Single Player)

- **Parameters**:
    - **Player**: Select a specific player from your defined players.
    - **Comparison**: Choose a comparison operator (Equal To, Not Equal To, Less Than, Greater Than) and provide a value to compare against.
    - **Trigger Behavior**: Choose when the trigger activates:
        - **On Change**: Triggers when the selected player's score changes and meets the condition.
        - **Continuous**: Triggers continuously while the score meets the condition.

### Score (Group Aggregate)

- **Parameters**:
    - **Players**: Multi-select multiple players to monitor.
    - **Aggregate**: Choose how to aggregate the scores:
        - **Max (Highest)**: Uses the highest score among selected players.
        - **Min (Lowest)**: Uses the lowest score among selected players.
        - **Sum**: Adds all selected players' scores together.
        - **Average**: Calculates the average of all selected players' scores.
        - **Any**: Trigger activates if any selected player meets the condition.
        - **All**: Trigger activates only if all selected players meet the condition.
    - **Comparison**: Choose a comparison operator and provide a value.
    - **Trigger Behavior**: Choose when the trigger activates:
        - **On Change**: Triggers when the aggregate value changes and meets the condition.
        - **Continuous**: Triggers continuously while the aggregate meets the condition.

### Score (Pairwise Difference)

- **Parameters**:
    - **Player A**: Select the first player.
    - **Player B**: Select the second player.
    - **Comparison**: Choose a comparison operator and provide a value to compare against Score(A) - Score(B).
    - **Trigger Behavior**: Choose when the trigger activates:
        - **On Change**: Triggers when the difference changes and meets the condition.
        - **Continuous**: Triggers continuously while the difference meets the condition.

### Formula Trigger

- **Parameter:**
    - **Condition**: A formula-like expression that must evaluate to `true` for the trigger to activate.
    - **Example:** `root.positions.at(9).cards.at(0).rank.biggerThan(root.positions.at(14).cards.at(0).rank)`
    - **Usage:** This trigger allows highly customizable conditions to determine when a rule should be activated.

### Manual Triggers

- **Parameters**:
    - **Trigger Name**: Select the manual trigger you've created (e.g., "Draw Card (Manual)").
    - **Description**: These triggers activate when the corresponding manual trigger button is clicked during gameplay by a user assigned to a player that can see the trigger.

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
        - **Visible to All (Green)**: The card is visible to all players, regardless of cell visibility.
        - **Private (Yellow)**: The card is visible only to the player who moved it.
        - **Hidden (Red)**: The card is hidden from all players.

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
- **Test Thoroughly**: Regularly test your rules to ensure they work as intended with different numbers of players.
- **Understand Logic**: Remember, multiple triggers within a rule work as "OR" logic, while inner rules enable "AND" logic.
- **Avoid Infinite Loops**: Be cautious when creating rules that could trigger each other indefinitely. Currently, the system does not prevent infinite loops automatically.
- **Duplicate Actions**: For the same game state, an action with the same name and parameters will only execute once, even if you've added it multiple times in your rules.

---

## Assigning Users to Players

### Before Starting the Game

1. **Navigate to Play**: Once your game setup is complete, click `Navigate To Play`.
2. **Open Assignment Dialog**: In the play area, click the `Assign Players` button.
3. **View Connected Users**: You'll see a list of all users connected to the room (shown as User 1, User 2, etc.).
4. **Assign Users to Players**:
- Each user can be assigned to one of your defined players
- Select a player from the dropdown next to each user
- Or leave them unassigned to remain as spectators
5. **Flexible Assignment**:
- Only the room creator can assign users to players
- Assignments can be changed at any time, even during gameplay
- If a user leaves, they'll be automatically unassigned
- You can assign a different user to that player and continue the game
- The game is tied to players, not to specific users

### Understanding Spectators

- **Default State**: All users start as spectators until assigned to a player
- **Spectator View**: Spectators can watch the game but cannot interact with it
- **Becoming a Player**: A spectator becomes an active player once assigned to a player by the room creator

---

## Starting the Game

1. **Start Game**: Click the `Start Game` button to begin playing.
2. **No Assignment Required**: The game can start even if not all players are assigned to users. Unassigned players simply won't have anyone controlling them until someone is assigned.
3. **Player Perspectives**: Each assigned user will see the grid rotated according to their player's perspective setting.

---

## During Gameplay

### Viewing the Interface

- **Scoreboard**: On the right side, you'll see scores displayed vertically for all players, along with:
    - The player name
    - The assigned user's name (if assigned)
    - Current score
- **Manual Triggers**: Displayed on the top bar (right side) after the game starts. Only manual triggers visible to your assigned player will be shown.
- **Spectator Count**: The number of spectators is displayed in the interface.

### Viewing Decks

- Players can see the top card of each deck (based on visibility settings for their player).

### Moving Cards

1. **Select a Card**: Click on the position where the card is located (currently, you can only move the top card).
2. **Choose Visibility**: On the left middle side of the screen, you will see five visibility options:
- **Cell (Blue)**: The card will take the same visibility as the destination cell defined in the game setup. This is the default and most commonly used option.
- **Keep (Gray)**: The card will keep its current visibility state.
- **Visible to All (Green)**: The card will be visible to all players, regardless of cell visibility.
- **Private (Yellow)**: The card will be visible only to your player (the player you're assigned to).
- **Hidden (Red)**: The card will be hidden from all players.

3. **Set Visibility**:
- **Select Visibility**: Before moving the card, select the desired visibility option from the list on the left middle side of the screen.
- **Visual Indicator**: When you select a card, it will have a shadow indicating the selected visibility option.
- **Move the Card**: Click on the destination to move the card there with the selected visibility.

4. **Use Manual Triggers**: Click on manual trigger buttons (if visible to your player) to perform custom actions you've defined.

---

## Ending the Game

- **Leave Room**: Use the `Leave Room` button to exit when finished.
- **Unassignment**: When you leave, you'll be unassigned from your player automatically.

---

## Notes

1. **No Constraints on Moves**: Currently, the game lacks constraints, so anyone can move any card at any time. The rules of the game should be agreed upon between the players.
2. **Inner Rules Evaluation**: Inner rules trigger based on the initial state of the parent rule, meaning they do not consider any actions executed by the parent action during that execution cycle.
3. **Be Careful with Infinite Loops**: The system does not prevent infinite loops automatically. Ensure your rules do not create unintended loops.
4. **Duplicate Actions Execution**: For the same game state, an action with the same name and parameters will only execute once, even if you've added it multiple times in your rules.
5. **Game Continuity**: The game is tied to players, not users. If a user disconnects, another user can be assigned to that player, and the game continues seamlessly.

---

## Additional Notes

- **Game Customization**: CGE offers extensive customization for multiplayer games but does not enforce specific game rules. Players must adhere to agreed-upon rules to ensure fair play.
- **Flexible Player Count**: You can create games for any number of players (up to 6), making CGE suitable for various card game types.
- **Feedback and Suggestions**: If you have ideas for new features or improvements, consider reaching out to the CGE development team.

---

Enjoy building and playing your custom multiplayer games with CGE!
# v0.22 UI :
## Assign Players
![image](https://github.com/user-attachments/assets/0033a935-e0f6-4810-a04c-6ff49e5c3e40)
## Edit Players
![image](https://github.com/user-attachments/assets/8b57f8ea-2606-4b2f-9767-c7eee86e92b3)

# v0.21 UI :
## Formula Builder
![image](https://github.com/user-attachments/assets/5c24ba6f-9038-4e0f-bd8c-96cf2d5f9ea7)
# v0.20 UI :
## Card Filter
![image](https://github.com/user-attachments/assets/3bc6cca0-3f40-4b57-bc7a-a6570797e627)
## Guide
![image](https://github.com/user-attachments/assets/c0dc75b2-a859-4ced-88ed-648477a41e79)

# v0.19 UI :
## Play Game
![image](https://github.com/user-attachments/assets/8718d4f3-dc93-456b-84f8-c1b3b7f845e7)

# v0.18 UI :
## Home
![image](https://github.com/user-attachments/assets/5d9e8e9f-5759-4601-8345-6153051b53ae)
## Create Game
![image](https://github.com/user-attachments/assets/c941d57a-9c68-473d-8b02-fb5c2eef98c2)
## Play Game
![image](https://github.com/user-attachments/assets/3496f48f-2730-403d-b027-22a2d836b3f9)

# v0.17 UI :
## Positions Selector
![image](https://github.com/user-attachments/assets/cdaecddf-d298-4324-87f3-8215538a482e)

# v0.16 UI :
## Import Game Setup
![image](https://github.com/user-attachments/assets/f6285799-2301-416b-b24e-ea6838302a1f)

# v0.15 UI :
## Create Game
![image](https://github.com/user-attachments/assets/826d9c90-84a9-4973-9cb0-b38174926cce)
## Play Game
![image](https://github.com/user-attachments/assets/980616ff-3164-4f76-ad22-74922a8e0508)
## Add Manual Triggers
![image](https://github.com/user-attachments/assets/053fcb2e-1ffa-4b87-9912-954014f79cd8)

# v0.13 UI :
## Create Game
![image](https://github.com/user-attachments/assets/f5eeb945-ede7-4db8-b3b9-0286e92a6658)

# v0.12 UI :
## Create Game
![image](https://github.com/YoussefM890/Card-Game-Engine/assets/72497217/aa4b06a0-1c89-4ad7-bf0a-080412fe5d21)
## Play Game
![image](https://github.com/YoussefM890/Card-Game-Engine/assets/72497217/eccb4ac0-14e4-4008-8dcd-815d54ab3df3)


# v0.11 UI :
## Create Game
![image](https://github.com/YoussefM890/Card-Game-Engine/assets/72497217/14a3eaf7-a6c9-4224-8a1c-eebf0fd23a47)

# v0.10 UI :
## Create Game
![image](https://github.com/YoussefM890/Card-Game-Engine/assets/72497217/71aa5d25-a41f-4df9-8b27-e325094665f7)

# v0.9 UI :
## Create Game
![v0 9 1](https://github.com/YoussefM890/Card-Game-Engine/assets/72497217/b6125286-a3da-4cca-9f10-6cee858a3563)
## Play Game
![image](https://github.com/YoussefM890/Card-Game-Engine/assets/72497217/84b8bc1c-bacf-4e1e-abcb-a6d257220fe5)