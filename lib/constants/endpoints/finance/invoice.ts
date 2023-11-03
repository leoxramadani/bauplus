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


  export const GET_PAYABLE_CURRENT_MONTH = 
  BASE_URL + `/api/Invoice/PayableInvoicesCurrentMonth`;

  export const GET_PAYABLE_PAST_MONTH = 
  BASE_URL + `/api/Invoice/PayableInvoicesPastMonth`;
  

  export const GET_RECIEVABLE_PAST_MONTH = 
  BASE_URL + `/api/Invoice/RecievableInvoicePastMonth`;


  export const GET_RECIEVABLE_CURRENT_MONTH = 
  BASE_URL + `/api/Invoice/RecievableInvoiceCurrentMonth`;
