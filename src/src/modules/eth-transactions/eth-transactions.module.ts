import { Module } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';
import { EthTransactionsController } from './eth-transactions.controller';

@Module({
  controllers: [EthTransactionsController],
  providers: [EthTransactionsService]
})
export class EthTransactionsModule {}
