import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateExpense1597704034880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expenses',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,

          },
          {
            name: 'value',
            type: 'decimal (10,2)',
            isNullable: false,
          },
          {
            name: 'automatic_debit',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'due_date',
            type: 'date',
          },
          {
            name: 'obs',
            type: 'varchar',
          },
          {
            name: 'current_installment',
            type: 'integer',
          },
          {
            name: 'installments',
            type: 'integer',
          },
          {
            name: 'paid',
            type: 'boolean',
          },
          {
            name: 'recurrent',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('expenses');
  }
}
