import { Module } from '@nestjs/common';
import { CheckAccountsService } from './check-accounts.service';
import { CheckAccountsController } from './check-accounts.controller';

@Module({
  controllers: [CheckAccountsController],
  providers: [CheckAccountsService]
})
export class CheckAccountsModule {}
