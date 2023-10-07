import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlockTransactionsEntity } from './block-transactions.entity';

@Entity('blocks')
export class BlocksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  block_number: number;

  @OneToMany(
    () => BlockTransactionsEntity,
    (blockTransaction) => blockTransaction.block,
  )
  blockTransaction: BlockTransactionsEntity;
}
