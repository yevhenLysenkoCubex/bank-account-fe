export interface IOperationResponse {
  amount: number;
  balance: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOperation
  extends Omit<IOperationResponse, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

export type IFilters = {
  updatedAt: string;
  amount: string;
  balance: string;
};

export type ISort =
  | "asc"
  | "desc"
  | "amountAsc"
  | "amountDesc"
  | "balanceAsc"
  | "balanceDesc";
