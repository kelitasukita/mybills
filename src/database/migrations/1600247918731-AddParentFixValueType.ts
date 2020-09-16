import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddParentFixValueType1600247918731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query("ALTER TABLE expenses ALTER COLUMN value TYPE DECIMAL(10,2)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
