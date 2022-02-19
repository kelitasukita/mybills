import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('creditcards')
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column('varchar')
  brand: string;

  @Column('varchar')
  name: string;

  @Column('integer')
  due_day: Number;

  @Column('decimal', { precision: 10, scale: 2 })
  limit: Number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CreditCard
