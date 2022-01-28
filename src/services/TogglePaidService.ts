import Expense from "../models/Expense";
import ExpensesRepository from '../repositories/ExpensesRepository';

class TogglePaidService {
  private repository: ExpensesRepository;

  constructor(expensesRepository: ExpensesRepository) {
    this.repository = expensesRepository;
  }

  public async execute(id: string): Promise<Expense | undefined> {

    // Validar se o registro existe no banco findOneOrFail no repository
    const expenseToBeUpdated = await this.repository.findOneOrFail(id);

    await this.repository.update(id, {
      paid: !expenseToBeUpdated.paid
    });

    const updatedExpense = await this.repository.findOne(id);

    return updatedExpense;
  }
}


export default TogglePaidService;
