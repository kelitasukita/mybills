import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateExpenses1598537881124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'expenses',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'value',
              type: 'decimal',
              isNullable: false,
            },
            {
              name: 'automaticDebit',
              type: 'boolean',
              isNullable: false,
            },
            {
              name: 'dueDate',
              type: 'date',
              isNullable: false,

            },
            {
              name: 'obs',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'currentInstallment',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'installments',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'paid',
              type: 'boolean',
              isNullable: true,
            },
            {
              name: 'recurrent',
              type: 'boolean',
              isNullable: false,
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
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('expenses');
    }

}
