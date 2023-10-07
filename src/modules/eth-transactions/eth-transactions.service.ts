import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BlocksEntity } from './entities/blocks.entity';
import { Repository } from 'typeorm';
import { BlockTransactionsEntity } from './entities/block-transactions.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class EthTransactionsService {
  constructor(
    @InjectRepository(BlocksEntity)
    private readonly blocksRepository: Repository<BlocksEntity>,
    @InjectRepository(BlockTransactionsEntity)
    private readonly blockTransactionsRepository: Repository<BlockTransactionsEntity>,
  ) {}

  async getTransactionsByBlock(): Promise<void> {
    const lastEthBlockNumber = await axios.get(
      'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber',
    );

    const lastBlockRecordInBd: BlocksEntity = await this.blocksRepository
      .createQueryBuilder('block')
      .select()
      .orderBy('block.block_number', 'DESC')
      .getOne();
    const lastBlockNumberInBd: number = lastBlockRecordInBd?.block_number
      ? lastBlockRecordInBd.block_number
      : 17582999;

    if (lastBlockNumberInBd < parseInt(lastEthBlockNumber.data.result, 16)) {
      const blockNumberForFetch: number = lastBlockNumberInBd + 1;

      let transactions = [];

      try {
        const blockInfo = await axios.get(
          `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumberForFetch.toString(
            16,
          )}&boolean=true`,
        );

        transactions = blockInfo.data.result.transactions;
      } catch (error) {
        throw new BadRequestException(
          'Ошибка при получении списка транзакций в блоке: ',
          error,
        );
      }

      if (transactions) {
        const savedBlock: BlocksEntity = await this.blocksRepository.save({
          block_number: blockNumberForFetch,
        });

        const preparedTransactions = transactions.map((elem) => {
          delete elem.blockNumber;

          return {
            ...elem,
            block: savedBlock,
          };
        });

        await this.blockTransactionsRepository.save(preparedTransactions);
      }
    }
  }

  // @Cron('55 * * * * *')
  // async handleCronJob() {
  //   const finishTime: number = +new Date() + 55000;

  //   while (finishTime > +new Date()) {
  //     await this.getTransactionsByBlock();
  //   }
  // }
}
