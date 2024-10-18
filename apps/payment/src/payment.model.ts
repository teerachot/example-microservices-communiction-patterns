export interface Payment {
  id: number;
  userId: number;
  method: 'DEBIT' | 'CREDIT';
  type: 'VISA' | 'MASTERCARD';
  no: number;
}
