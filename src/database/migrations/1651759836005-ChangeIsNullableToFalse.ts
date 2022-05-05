import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeIsNullableToFalse1651759836005 implements MigrationInterface {
    name = 'ChangeIsNullableToFalse1651759836005'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "expenses" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "earnings" ALTER COLUMN "userId" SET NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "expenses" ALTER COLUMN "currency" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
