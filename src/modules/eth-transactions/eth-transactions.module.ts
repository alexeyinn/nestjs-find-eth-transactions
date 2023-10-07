import { Module } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';
import { EthTransactionsController } from './eth-transactions.controller';
import { BlocksEntity } from './entities/blocks.entity';
import { BlockTransactionsEntity } from './entities/block-transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlockTransactionsEntity, BlocksEntity])],
  controllers: [EthTransactionsController],
  providers: [EthTransactionsService],
})
export class EthTransactionsModule {}
