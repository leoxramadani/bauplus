import { BASE_URL } from '..';

export const INVOICE_CREATE = BASE_URL + `/api/Invoice/create`;

export const INVOICE_GET_ALL = BASE_URL + `/api/Invoice/invoices`;
export const INVOICE_REGISTER = BASE_URL + `/api/Invoice/register`;
export const INVOICE_RECORD_PAYMENT =
  BASE_URL + `/api/Invoice/recordpayment`;
export const INVOICE_AGING_REPORT =
  BASE_URL + `/api/Invoice/agingreport`;
export const INVOICE_VALIDATE = BASE_URL + `/api/Invoice/validate/`;
export const INVOICE_STATUS = BASE_URL + `/api/Invoice/status/`;

export const UPDATE_INVOICE = BASE_URL + `/api/Invoice/update`;
export const GET_SPECIFIC_INVOICE =
  BASE_URL + `/api/Invoice/speficic`;
