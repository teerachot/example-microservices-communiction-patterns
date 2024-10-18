export interface StockItem {
  productId: number;
  quantity: number;
  supplier: {
    id: number;
    name: string;
    email: string;
    tel: string;
  };
}
