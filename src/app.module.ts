import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransactionsModule } from './modules/eth-transactions/eth-transactions.module';
import { BlocksEntity } from './modules/eth-transactions/entities/blocks.entity';
import { BlockTransactionsEntity } from './modules/eth-transactions/entities/block-transactions.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckAccountsModule } from './modules/check-accounts/check-accounts.module';

console.log(process.env.POSTGRES_SYNCHRONIZE);
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: JSON.parse(process.env.POSTGRES_SYNCHRONIZE),
      entities: [BlockTransactionsEntity, BlocksEntity],
    }),
    EthTransactionsModule,
    CheckAccountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
