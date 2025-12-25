export enum VisibilityEnum {
  All = 2,
  None = 3,
  Specific = 4,
}

export const VisibilityEnumView = {
  [VisibilityEnum.All]: "All Players",
  [VisibilityEnum.None]: "No Players",
  [VisibilityEnum.Specific]: "Specific Players",
} as const;

export type VisibilityEnumType = keyof typeof VisibilityEnumView;
