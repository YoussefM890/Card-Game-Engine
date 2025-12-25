export enum PerspectiveEnum {
  Bottom = 1,
  Top = 2,
  Left = 3,
  Right = 4,
}

export const PerspectiveEnumView = {
  [PerspectiveEnum.Bottom]: "Bottom",
  [PerspectiveEnum.Top]: "Top",
  [PerspectiveEnum.Left]: "Left",
  [PerspectiveEnum.Right]: "Right",
} as const;

export const RotationsNeeded: Record<PerspectiveEnum, number> = {
  [PerspectiveEnum.Bottom]: 0,
  [PerspectiveEnum.Right]: 1,
  [PerspectiveEnum.Top]: 2,
  [PerspectiveEnum.Left]: 3,
} as const;

export type PerspectiveEnumType = keyof typeof PerspectiveEnumView;
