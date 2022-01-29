import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEarnings1643491750428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'earnings',
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
              name: 'receiptDate',
              type: 'date',
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
      );
     }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
