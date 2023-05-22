import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import ExpenseType from "./ExpenseType";

@Entity("recurrent_expenses")
class RecurrentExpense {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column("varchar")
  userId: String = "117908811566542498391";

  @ManyToOne(() => ExpenseType)
  @JoinColumn({ name: "expense_type_id" })
  expenseType: ExpenseType;

  @Column("varchar")
  description: String;

  @Column("decimal", { precision: 10, scale: 2 })
  value: Number;

  @Column("boolean")
  automaticDebit: boolean;

  @Column("date")
  dueDate: Date;

  @Column("varchar")
  obs: String;

  @Column("int")
  currentInstallment: number;

  @Column("int")
  installments: number;

  @Column("boolean")
  paid: boolean;

  @Column("boolean")
  currency: String;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  overdue: boolean = false;

  exchangedValue: number = 0;
}

export default RecurrentExpense;
