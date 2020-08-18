import { uuid } from 'uuidv4';

class Expenses {
  id: string;

  description: string;

  value: number;

  automaticDebit: boolean;

  dueDate: Date;

  obs: string;

  currentInstallment: bigint;

  installments: bigint;

  paid: boolean;

  recurrent: boolean;

  constructor(
    description: string,
    value: number,
    automaticDebit: boolean,
    dueDate: Date,
    obs: string,
    currentInstallment: bigint,
    installments: bigint,
    paid: boolean,
    recurrent: boolean,
  ) {
    this.id = uuid();
    this.description = description;
    this.value = value;
    this.automaticDebit = automaticDebit;
    this.dueDate = dueDate;
    this.obs = obs;
    this.currentInstallment = currentInstallment;
    this.installments = installments;
    this.paid = paid;
    this.recurrent = recurrent;
  }
}

export default Expenses;
