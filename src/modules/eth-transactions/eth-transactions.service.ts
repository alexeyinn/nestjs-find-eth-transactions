import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BlocksEntity } from './entities/blocks.entity';
import { Repository } from 'typeorm';
import { BlockTransactionsEntity } from './entities/block-transactions.entity';

@Injectable()
export class EthTransactionsService {
  constructor(
    @InjectRepository(BlocksEntity)
    private readonly blocksRepository: Repository<BlocksEntity>,
    @InjectRepository(BlockTransactionsEntity)
    private readonly blockTransactionsRepository: Repository<BlockTransactionsEntity>,
  ) {}

  async getTransactionsByBlock(): Promise<void> {
    const blockNumberInHex: string = '10C4B98';

    const {
      data: {
        result: { transactions },
      },
    } = await axios.get(
      `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumberInHex}&boolean=true`,
    );

    const savedBlock: BlocksEntity = await this.blocksRepository.save({
      block_number: parseInt('10C4B98', 16),
    });

    const preparedTransactions: BlockTransactionsEntity = transactions.map(
      (elem) => {
        delete elem.blockNumber;

        return {
          ...elem,
          block: savedBlock,
        };
      },
    );

    await this.blockTransactionsRepository.save(preparedTransactions);
  }
}
