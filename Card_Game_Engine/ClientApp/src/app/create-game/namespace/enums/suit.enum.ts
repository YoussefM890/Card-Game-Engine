import {ListToObject} from "../../../shared/functions/global";

export enum SuitEnum {
  HEARTS = 1,
  DIAMONDS = 2,
  CLUBS = 3,
  SPADES = 4,
  OTHER = 5,
}
export const suitsList = [
  {value: SuitEnum.HEARTS, display: 'Hearts', class: 'hearts',symbol:'♥',color:'red'},
  {value: SuitEnum.DIAMONDS, display: 'Diamonds', class: 'diams',symbol:'♦',color:'red'},
  {value: SuitEnum.CLUBS, display: 'Clubs', class: 'clubs',symbol:'♣',color:'black'},
  {value: SuitEnum.SPADES, display: 'Spades', class: 'spades',symbol:'♠',color:'black'},
  {value: SuitEnum.OTHER, display: 'Other', class: 'other',symbol:'?',color:'transparent'},
];
export const suitsObject = ListToObject(suitsList, 'value');
