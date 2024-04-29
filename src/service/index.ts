import { AxiosResponse } from "axios";
import api from "../api/api";
import type { IOperationResponse } from "../types";

export const operationsService = {
  getMoneyAmount: () => {
    return api.get("/operations/money-amount");
  },

  deposit: (amount: string): Promise<AxiosResponse<IOperationResponse>> => {
    return api.post("/operations/deposit", { amount });
  },

  withdraw: (withdraw: string): Promise<AxiosResponse<IOperationResponse>> => {
    return api.post("/operations/withdraw", { amount: withdraw });
  },

  send: (amount: string): Promise<AxiosResponse<IOperationResponse>> => {
    return api.post("/operations/send", { amount });
  },

  getOperations: (): Promise<AxiosResponse<IOperationResponse[]>> => {
    return api.get("/operations");
  },
};
