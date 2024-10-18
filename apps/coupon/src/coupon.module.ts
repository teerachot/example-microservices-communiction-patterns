import { Logger, Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';

@Module({
  imports: [],
  controllers: [CouponController],
  providers: [CouponService, Logger],
})
export class CouponModule {}
