import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cards-expenses')
class CardExpense {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column('varchar')
  name: string;

  @Column('date')
  purchaseDate: Date;

  @Column('varchar')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: Number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardExpense;
