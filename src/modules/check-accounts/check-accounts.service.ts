import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlocksEntity } from '../eth-transactions/entities/blocks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckAccountsService {
  constructor(
    @InjectRepository(BlocksEntity)
    private readonly blocksRepository: Repository<BlocksEntity>,
  ) {}

  async findMostActiveAccount() {
    const lastBlocks: BlocksEntity[] = await this.blocksRepository.find({
      order: { id: 'DESC' },
      take: 100,
      relations: ['blockTransaction'],
    });

    const walletBalances = {};

    lastBlocks.forEach((block) => {
      block.blockTransaction.forEach((transaction) => {
        const { from, to } = transaction;
        const value: number = parseInt(transaction.value, 16);

        if (from in walletBalances) {
          walletBalances[from] -= value;
        } else {
          walletBalances[from] = -value;
        }
        if (to in walletBalances) {
          walletBalances[to] += value;
        } else {
          walletBalances[to] = value;
        }
      });
    });

    let maxChangeWallet: null | string = null;
    let maxChange: number = 0;

    for (const wallet in walletBalances) {
      const change = Math.abs(walletBalances[wallet]);
      if (change > maxChange) {
        maxChange = change;
        maxChangeWallet = wallet;
      }
    }

    return { wallet: maxChangeWallet, maxChange };
  }
}
