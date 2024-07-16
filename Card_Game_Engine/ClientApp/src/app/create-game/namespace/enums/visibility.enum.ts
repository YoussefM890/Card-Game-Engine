export enum VisibilityEnum {
  Visible = 2,
  Hidden = 3,
  Player1 = 4,
  Player2 = 5,
}

export const VisibilityEnumView = {
  [VisibilityEnum.Visible]: "Visible",
  [VisibilityEnum.Hidden]: "Hidden",
  [VisibilityEnum.Player1]: "Player 1",
  [VisibilityEnum.Player2]: "Player 2",
} as const;

export type VisibilityEnumType = keyof typeof VisibilityEnumView;
