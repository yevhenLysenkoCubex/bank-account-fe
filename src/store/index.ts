import { proxy } from "valtio";
import { devtools } from "valtio/utils";

import type { IOperation } from "../types";
import { operationsService } from "../service";
import { formatDate } from "../utils";

export type ProjectStore = {
  isLoading: boolean;
  operations: IOperation[];
  totalAmount: number;
  deposit: string;
  withdraw: string;
  send: string;
};

const initialStore: ProjectStore = {
  isLoading: false,
  operations: [],
  totalAmount: 0,
  deposit: "0",
  withdraw: "0",
  send: "0",
};

export const projectStore = proxy<ProjectStore>({
  ...initialStore,
});

export const projectStoreMutations = {
  fetchOperations: async () => {
    try {
      projectStore.isLoading = true;

      const response = await operationsService.getOperations();

      const data: IOperation[] = response.data
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        })
        .map((operation) => ({
          ...operation,
          createdAt: formatDate(operation.createdAt),
          updatedAt: formatDate(operation.updatedAt),
        }));

      projectStore.operations = data;
    } catch (error) {
      console.error(error);
    } finally {
      projectStore.isLoading = false;
    }
  },

  fetchTotalAmount: async () => {
    try {
      const response = await operationsService.getMoneyAmount();
      projectStore.totalAmount = response.data.amount;
    } catch (error) {
      console.error(error);
    }
  },

  deposit: async (amount: string) => {
    try {
      const response = await operationsService.deposit(amount);

      const data: IOperation = {
        ...response.data,
        createdAt: formatDate(response.data.createdAt),
        updatedAt: formatDate(response.data.updatedAt),
      };

      projectStore.operations.unshift(data);
      projectStore.totalAmount = response.data.balance;
    } catch (error) {
      console.error(error);
    }
  },

  withdraw: async (withdraw: string) => {
    try {
      const response = await operationsService.withdraw(withdraw);

      const data: IOperation = {
        ...response.data,
        createdAt: formatDate(response.data.createdAt),
        updatedAt: formatDate(response.data.updatedAt),
      };

      projectStore.operations.unshift(data);
    } catch (error) {
      console.error(error);
    }
  },

  send: async (withdraw: string) => {
    try {
      const response = await operationsService.send(withdraw);

      const data: IOperation = {
        ...response.data,
        createdAt: formatDate(response.data.createdAt),
        updatedAt: formatDate(response.data.updatedAt),
      };

      projectStore.operations.unshift(data);
    } catch (error) {
      console.error(error);
    }
  },

  changeDeposit: (value: string) => {
    projectStore.deposit = value;
  },

  changeWithdraw: (value: string) => {
    projectStore.withdraw = value;
  },

  changeSend: (value: string) => {
    projectStore.send = value;
  },
};

devtools(projectStore, { name: "projectStore", enabled: true });
