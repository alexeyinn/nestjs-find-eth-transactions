import { Controller } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';

@Controller('eth-transactions')
export class EthTransactionsController {
  constructor(private readonly ethTransactionsService: EthTransactionsService) {}
}
