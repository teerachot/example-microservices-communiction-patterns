import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';

describe('CouponController', () => {
  let couponController: CouponController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
      providers: [CouponService],
    }).compile();

    couponController = app.get<CouponController>(CouponController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(couponController.getHello()).toBe('Hello World!');
    });
  });
});
