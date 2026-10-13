import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaymentVerificationService } from './payment-verification.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, PaymentVerificationService],
})
export class AppModule {}
