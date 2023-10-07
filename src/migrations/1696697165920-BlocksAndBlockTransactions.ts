import { MigrationInterface, QueryRunner } from "typeorm";

export class BlocksAndBlockTransactions1696697165920 implements MigrationInterface {
    name = 'BlocksAndBlockTransactions1696697165920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blocks" ("id" SERIAL NOT NULL, "block_number" integer NOT NULL, CONSTRAINT "PK_8244fa1495c4e9222a01059244b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block_transactions" ("id" SERIAL NOT NULL, "blockHash" character varying NOT NULL, "from" character varying NOT NULL, "gas" character varying NOT NULL, "gasPrice" character varying NOT NULL, "maxFeePerGas" character varying, "hash" character varying NOT NULL, "input" character varying NOT NULL, "nonce" character varying NOT NULL, "to" character varying NOT NULL, "transactionIndex" character varying NOT NULL, "value" character varying NOT NULL, "type" character varying NOT NULL, "accessList" character varying array, "chainId" character varying, "v" character varying NOT NULL, "r" character varying NOT NULL, "s" character varying NOT NULL, "blockId" integer, CONSTRAINT "PK_3280a043810d1a02ec937ebc70e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "block_transactions" ADD CONSTRAINT "FK_ed85a164f8f5b611dddf0e1c086" FOREIGN KEY ("blockId") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block_transactions" DROP CONSTRAINT "FK_ed85a164f8f5b611dddf0e1c086"`);
        await queryRunner.query(`DROP TABLE "block_transactions"`);
        await queryRunner.query(`DROP TABLE "blocks"`);
    }

}
