import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlocksEntity } from './blocks.entity';

@Entity()
export class BlockTransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockHash: string;

  @Column()
  from: string;

  @Column()
  gas: string;

  @Column()
  gasPrice: string;

  @Column({ nullable: true })
  maxFeePerGas: string;

  @Column()
  hash: string;

  @Column()
  input: string;

  @Column()
  nonce: string;

  @Column()
  to: string;

  @Column()
  transactionIndex: string;

  @Column()
  value: string;

  @Column()
  type: string;

  @Column('varchar', { array: true, nullable: true })
  accessList: string[];

  @Column()
  chainId: string;

  @Column()
  v: string;

  @Column()
  r: string;

  @Column()
  s: string;

  @ManyToOne(() => BlocksEntity, (block) => block.blockTransaction)
  block: BlocksEntity;
}
