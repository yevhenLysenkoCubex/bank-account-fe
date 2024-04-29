import type { IFilters, ISort } from "./types";
import { IOperation } from "./types";

export const sort = (array: IOperation[], sortValue: ISort) => {
  switch (sortValue) {
    case "asc":
      return array.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt.split(".").reverse().join("-"));
        const dateB = new Date(b.updatedAt.split(".").reverse().join("-"));
        return dateA.getTime() - dateB.getTime();
      });

    case "desc":
      return array.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt.split(".").reverse().join("-"));
        const dateB = new Date(b.updatedAt.split(".").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
      });

    case "amountAsc":
      return array.sort((a, b) => b.amount - a.amount);

    case "amountDesc":
      return array.sort((a, b) => a.amount - b.amount);

    case "balanceAsc":
      return array.sort((a, b) => b.balance - a.balance);

    case "balanceDesc":
      return array.sort((a, b) => a.balance - b.balance);

    default:
      return array;
  }
};

export const filterArray = (array: IOperation[], filter: IFilters) => {
  return array.filter(
    (item) =>
      (String(item.amount)
        .toLowerCase()
        .includes(filter.amount.toLowerCase()) ||
        !filter.amount) &&
      (String(item.balance)
        .toLowerCase()
        .includes(filter.balance.toLowerCase()) ||
        !filter.balance) &&
      (item.updatedAt.toLowerCase().includes(filter.updatedAt.toLowerCase()) ||
        !filter.updatedAt)
  );
};

export function formatDate(inputDate: Date) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
}
