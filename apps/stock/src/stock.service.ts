import { Injectable } from '@nestjs/common';
import { StockItem } from './stock-item.model';
import { StockReservationDto } from './stock-reservation.dto';

@Injectable()
export class StockService {
  items: StockItem[] = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.items.push({
        productId: i,
        quantity: i,
        supplier: {
          id: i,
          name: `Name#${i}`,
          email: `my${i}@email.com`,
          tel: `081-111-111${i}`,
        },
      });
    }
  }

  reserveInventory(reservations: StockReservationDto[]) {
    const clonedItems = structuredClone(this.items);

    for (const { productId, quantity } of reservations) {
      const item = clonedItems.find((i) => i.productId === productId);

      if (item.quantity < quantity) return false;

      item.quantity -= quantity;
    }

    this.items = clonedItems;
    return true;
  }
}
