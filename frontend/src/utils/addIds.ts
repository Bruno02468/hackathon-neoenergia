import { obj } from 'typings/utils';

export function addIds<T extends obj>(arrOfObj: T[]) {
  return arrOfObj.map((item, id) => ({
    ...item,
    id,
  }));
}
