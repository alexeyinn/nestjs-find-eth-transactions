import { Controller, Get } from '@nestjs/common';
import { CheckAccountsService } from './check-accounts.service';

@Controller('check-accounts')
export class CheckAccountsController {
  constructor(private readonly checkAccountsService: CheckAccountsService) {}

  @Get()
  findMostActiveAccount() {
    return this.checkAccountsService.findMostActiveAccount();
  }
}
