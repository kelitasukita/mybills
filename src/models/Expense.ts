import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import ExpenseType from './ExpenseType';

@Entity('expenses')
class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @ManyToOne(() => ExpenseType)
  @JoinColumn({ name: 'expense_type_id' })
  expenseType: ExpenseType;

  @Column('varchar')
  description: String;

  @Column('decimal', { precision: 10, scale: 2 })
  value: Number

  @Column('boolean')
  automaticDebit: boolean;

  @Column('date')
  dueDate: Date;

  @Column('varchar')
  obs: String;

  @Column('int')
  currentInstallment: BigInt;

  @Column('int')
  installments: BigInt;

  @Column('boolean')
  paid: boolean;

  @Column('boolean')
  recurrent: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  overdue: boolean = false;
}

export default Expense;
