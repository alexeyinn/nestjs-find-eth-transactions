import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransactionsModule } from './src/modules/eth-transactions/eth-transactions.module';
import { BlocksEntity } from './src/modules/eth-transactions/entities/blocks.entity';
import { BlockTransactionsEntity } from './src/modules/eth-transactions/entities/block-transactions.entity';

console.log(process.env.POSTGRES_SYNCHRONIZE);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: JSON.parse(process.env.POSTGRES_SYNCHRONIZE),
      entities: [BlocksEntity, BlockTransactionsEntity],
    }),
    EthTransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
