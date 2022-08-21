import {MigrationInterface, QueryRunner} from "typeorm";

export class shift1660991196199 implements MigrationInterface {
    name = 'shift1660991196199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shift" ADD "publishedAt" TIMESTAMPTZ`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shift" DROP COLUMN "publishedAt"`);
    }

}
