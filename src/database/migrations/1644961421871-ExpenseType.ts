import { request } from "express";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ExpenseType1644961421871 implements MigrationInterface {
    name = 'ExpenseType1644961421871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'expense_types',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'label',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'creditcard_id',
                type: 'uuid',
                isNullable: true,
              }
            ]
          })
        );

        await queryRunner.createForeignKey(
          'expense_types',
          new TableForeignKey({
            columnNames: ['creditcard_id'],
            referencedTableName: 'creditcards',
            referencedColumnNames: ['id']
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('expense_types');

      if (table) {
        const foreignKeys = await table?.foreignKeys;
        await queryRunner.dropForeignKeys(table, foreignKeys);
      }

      await queryRunner.dropTable('expense_types');
    }

}
