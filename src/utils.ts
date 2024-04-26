import type { IFilters, ISort } from "./App";
import { IMockOperations } from "./mock";

export function getReadableDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export const sort = (array: IMockOperations[], sortValue: ISort) => {
  switch (sortValue) {
    case "asc":
      return array.slice().sort((a, b) => {
        const dateA = new Date(a.date.split(".").reverse().join("-"));
        const dateB = new Date(b.date.split(".").reverse().join("-"));
        return dateA.getTime() - dateB.getTime();
      });

    case "desc":
      return array.slice().sort((a, b) => {
        const dateA = new Date(a.date.split(".").reverse().join("-"));
        const dateB = new Date(b.date.split(".").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
      });

    default:
      return array;
  }
};

export const filterArray = (array: IMockOperations[], filter: IFilters) => {
  return array.filter(
    (item) =>
      (item.amount.toLowerCase().includes(filter.amount.toLowerCase()) ||
        !filter.amount) &&
      (item.balance.toLowerCase().includes(filter.balance.toLowerCase()) ||
        !filter.balance) &&
      (item.date.toLowerCase().includes(filter.date.toLowerCase()) ||
        !filter.date)
  );
};
