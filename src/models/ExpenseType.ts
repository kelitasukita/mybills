import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import CreditCard from './CreditCard';

@Entity('expensestype')
class ExpenseType {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column('varchar')
  label: string;

  @OneToOne(() => CreditCard)
  @JoinColumn({ name: 'creditcard_id' })
  creditcard: CreditCard;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExpenseType;
