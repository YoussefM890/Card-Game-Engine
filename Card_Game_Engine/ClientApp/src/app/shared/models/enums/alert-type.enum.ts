export enum AlertTypeEnum {
  Success = 0,
  Info = 1,
  Warning = 2,
  Error = 3
}

export const AlertTypeEnumClass = {
  [AlertTypeEnum.Success]: 'success-snackbar',
  [AlertTypeEnum.Info]: 'info-snackbar',
  [AlertTypeEnum.Warning]: 'warning-snackbar',
  [AlertTypeEnum.Error]: 'error-snackbar'
} as const;



