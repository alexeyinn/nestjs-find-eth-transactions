import { Module } from '@nestjs/common';
import { CheckAccountsService } from './check-accounts.service';
import { CheckAccountsController } from './check-accounts.controller';
import { BlockTransactionsEntity } from '../eth-transactions/entities/block-transactions.entity';
import { BlocksEntity } from '../eth-transactions/entities/blocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlockTransactionsEntity, BlocksEntity])],
  controllers: [CheckAccountsController],
  providers: [CheckAccountsService],
})
export class CheckAccountsModule {}
