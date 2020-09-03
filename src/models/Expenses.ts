import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('expenses')
class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column('varchar')
  description: String;

  @Column('decimal')
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
}

export default Expense;
