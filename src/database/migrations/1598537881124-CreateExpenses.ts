import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateExpenses1598537881124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'expenses',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid'
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
            },
            {
              name: 'currentInstallment',
              type: 'int',
            },
            {
              name: 'installments',
              type: 'int',
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
            }

          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('expenses');
    }

}
