// on real should be connect to db with ORM
export interface Transaction {
  id: number;
  orderId: number;
  paymentId: number;
  amount: number;
}
