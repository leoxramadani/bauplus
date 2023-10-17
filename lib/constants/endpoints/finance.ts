const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_BANKACCOUNTS =
  BASE_URL + `/api/BankAccount/GetBankAccounts`;

export const GET_ONE_BANKACCOUNT =
  BASE_URL + `/api/BankAccount/GetSpecificBankAccount`;

export const GET_ALL_CURRENCIES =
  BASE_URL + `/api/BankAccount/GetCurrencies`;

export const GET_ALL_ACCOUNT_TYPES =
  BASE_URL + `/api/BankAccount/GetBankAccountTypes`;

export const GET_ALL_ACCOUNT_STATUSES =
  BASE_URL + `/api/BankAccount/GetBankAccountStatus`;

export const GET_MY_EMPLOYEE_NAMES =
  BASE_URL + `/api/BankAccount/GetEmployeesBankAccounts`;

export const CREATE_BANK_ACCOUNT =
  BASE_URL + `/api/BankAccount/CreateBankAccount`;

export const UPDATE_BANK_ACCOUNT =
  BASE_URL + `/api/BankAccount/UpdateBankAccount`;

export const DELETE_BANK_ACCOUNT =
  BASE_URL + `/api/BankAccount/DeleteBankAccount`;
