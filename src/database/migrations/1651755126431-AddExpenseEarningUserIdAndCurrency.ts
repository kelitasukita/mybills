import {MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddExpenseEarningUserIdAndCurrency1651755126431 implements MigrationInterface {
    name = 'AddExpenseEarningUserIdAndCurrency1651755126431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'expenses',
            new TableColumn({
                name: 'currency',
                width: 3,
                type: 'varchar',
                isNullable: true,
            })

        );
        await queryRunner.addColumn(
            'expenses',
            new TableColumn({
                name: 'userId',
                type: 'varchar',
                isNullable: true,
            })
    
        );
        await queryRunner.addColumn(
            'earnings',
            new TableColumn({
                name: 'userId',
                type: 'varchar',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
    }

}
