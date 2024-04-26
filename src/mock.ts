export const mock = [
  { id: "1", label: "Send Iban account" },
  { id: "2", label: "No Iban account" },
  { id: "3", label: "Iban account" },
  { id: "4", label: "No Send account" },
];

export interface IMockOperations {
  id: string;
  date: string;
  amount: string;
  balance: string;
}

export const mockOperations: IMockOperations[] = [
  { id: "qqq", date: "28.08.2019", amount: "-100", balance: "400" },
  { id: "qq31q", date: "18.08.2021", amount: "100", balance: "500" },
  { id: "qqq1", date: "23.08.2013", amount: "200", balance: "600" },
];
