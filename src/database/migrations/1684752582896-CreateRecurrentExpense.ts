import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRecurrentExpense1684752582896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recurrent_expenses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "expenseTypeId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "value",
            type: "decimal",
            isNullable: false,
          },
          {
            name: "automaticDebit",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "dueDateMonth",
            type: "int",
            isNullable: false,
          },
          {
            name: "dueDateDay",
            type: "int",
            isNullable: false,
          },
          {
            name: "obs",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "currency",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "recurrent_expenses",
      new TableForeignKey({
        columnNames: ["expenseTypeId"],
        referencedTableName: "expense_types",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recurrent_expenses");
  }
}
