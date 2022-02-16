import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddExpenseTypeColumn1644968671205 implements MigrationInterface {
    name = 'AddExpenseTypeColumn1644968671205'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'expenses',
        new TableColumn({
          name: 'expense_type_id',
          type: 'uuid',
          isNullable: true,
        })
      );

      await queryRunner.createForeignKey(
        'expenses',
        new TableForeignKey({
          columnNames: ['expense_type_id'],
          referencedTableName: 'expense_types',
          referencedColumnNames: ['id']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('expenses');

        if (table) {
          const foreignKeys = await table.foreignKeys;
          await queryRunner.dropForeignKeys(table, foreignKeys);
        }
    }

}
