import { EntityRepository, Repository, Between, Not, LessThan } from "typeorm";

import Expense from "../models/Expense";

interface ExpenseData {
  description: string;
  currency: string;
  value: number;
  automaticDebit: boolean;
  dueDate: Date;
  obs: string;
  currentInstallment: number;
  installments: number;
  paid: boolean;
  recurrent: boolean;
}

@EntityRepository(Expense)
class ExpenseRepository extends Repository<Expense> {
  public async createExpense(data: ExpenseData): Promise<Expense> {
    const expense = this.create(data);

    return await this.save(expense);
  }

  public async manualPayment(): Promise<Expense[] | undefined> {
    const expenses = await this.find({
      select: ["id", "description", "dueDate", "paid", "value"],
      where: { automaticDebit: false },
      order: {
        dueDate: "ASC",
      },
    });

    return expenses;
  }

  public async automaticPayments(): Promise<Expense[] | undefined> {
    const expenses = await this.find({
      select: ["id", "description", "paid", "value", "dueDate"],
      where: { automaticDebit: true },
      order: {
        dueDate: "ASC",
        value: "DESC",
      },
    });

    return expenses;
  }

  public async allPayments(): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [
        "id",
        "description",
        "paid",
        "value",
        "currentInstallment",
        "installments",
      ],
      order: {
        paid: "DESC",
        dueDate: "ASC",
        value: "DESC",
      },
    });

    return allExpenses;
  }

  public async unpaid(from: Date, to: Date): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [
        "id",
        "description",
        "paid",
        "currency",
        "value",
        "dueDate",
        "currentInstallment",
        "installments",
      ],
      where: [
        {
          paid: false,
          dueDate: Between(from, to),
        },
        {
          paid: false,
          dueDate: LessThan(to < new Date() ? to : new Date()),
        },
      ],
      order: {
        description: "ASC",
        value: "DESC",
      },
    });

    return allExpenses;
  }

  public async allExpenses(
    from: Date,
    to: Date
  ): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [
        "id",
        "description",
        "paid",
        "value",
        "dueDate",
        "currentInstallment",
        "installments",
      ],
      where: {
        dueDate: Between(from, to),
      },
      order: {
        description: "ASC",
      },
    });

    return allExpenses;
  }

  public async paid(from: Date, to: Date): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [
        "id",
        "description",
        "paid",
        "value",
        "dueDate",
        "currentInstallment",
        "installments",
      ],
      where: {
        paid: true,
        dueDate: Between(from, to),
      },
      order: {
        description: "ASC",
        value: "DESC",
      },
    });

    return allExpenses;
  }

  public async isDuplicated(
    description: string,
    value: number,
    dueDate: Date
  ): Promise<Expense | undefined> {
    const expense = await this.findOne({
      where: {
        description,
        value,
        dueDate,
      },
    });

    return expense;
  }

  public async isDuplicatedButNotMe(
    id: string,
    description: string,
    value: number,
    dueDate: Date
  ): Promise<Expense | undefined> {
    const expense = await this.findOne({
      where: {
        id: Not(id),
        description,
        value,
        dueDate,
      },
    });

    return expense;
  }

  public async generateMissingRecurrent(
    year: number,
    month: number
  ): Promise<Expense[] | undefined> {
    const today = new Date();
    const requestDate = new Date(year, month - 1, 24, 0, 0, 0); // Ano mês dia, Hora, minuto e segundo

    const from = new Date(year, month - 1, 24);
    const to = new Date(year, month, 23);

    // console.log(year, month, today, requestDate, 'from e to: ',  from, to);

    // @todo verificar como criar os registros de recurrent que faltam pros meses já visitados
    const hasRecurrent = await this.findOne({
      where: {
        recurrent: true,
        dueDate: Between(from, to),
      },
    });

    if (hasRecurrent) {
      // Verifica se não tem recurrent, se tiver não gera nada
      // PRECISO VERIFICAR SE TEM RECURRENT, SE TIVER VERIFICO SE TODAS AS ATUAIS SÃO IGUAIS ÀS DOS
      // MESES ANTERIORES, SE NÃO FOREM ADD AS NOVAS RECURRENTS.
      return;
    }

    // Busca os recurrents menores que o from
    const recurrents = await this.createQueryBuilder("expenses")
      .distinct()
      .select("description")
      .addSelect("value")
      .addSelect("currency")
      .addSelect('MAX("dueDate")', "duedate")
      .where("recurrent = :value", { value: true })
      .andWhere('"dueDate" < :from', { from })
      .groupBy("description")
      .addGroupBy("value")
      .addGroupBy("currency")
      .orderBy("duedate", "DESC")
      .getRawMany();

    console.log(recurrents);

    const recurrentCreated: any[] = [];

    await Promise.all(
      recurrents.map(async (bill) => {
        if (recurrentCreated.indexOf(bill.description) == -1) {
          // se não foi gerado, gerar

          recurrentCreated.push(bill.description); // Alimentando array com a description pra ser gerada

          const newMonth = bill.duedate.getDate() > 23 ? month - 1 : month; // calculo do novo mês
          const newDueDate = new Date(year, newMonth, bill.duedate.getDate()); // calculo da data de vencimento

          // verificar se já existe no banco
          const exists = await this.findOne({
            where: {
              description: bill.description,
              recurrent: true,
              dueDate: Between(from, to),
            },
          });

          if (!exists) {
            // se não existir
            // Posso criar
            await this.createExpense({
              description: bill.description,
              value: +bill.value,
              currency: bill.currency,
              automaticDebit: true,
              dueDate: newDueDate,
              paid: false,
              recurrent: true,
              obs: "",
              currentInstallment: 0,
              installments: 0,
            });
          }
        }
      })
    );
  }
}

export default ExpenseRepository;
