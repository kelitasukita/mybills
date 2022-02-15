import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreditCard1644960526469 implements MigrationInterface {
    name = 'CreditCard1644960526469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'creditcards',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'brand',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'name',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'due_day',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'limit',
                type: 'decimal',
                isNullable: true,
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              }
            ]
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('creditcards');
    }

}
