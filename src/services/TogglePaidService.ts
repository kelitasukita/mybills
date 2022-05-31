import axios from "axios";
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

    let value = expenseToBeUpdated.value;
    let obs = '';

    if (expenseToBeUpdated.currency !== "EUR" && expenseToBeUpdated.paid == false) { 
          
      const response = await axios.post(`https://api.transferwise.com/v3/quotes/`, {
        "targetAmount": expenseToBeUpdated.value,
        "sourceCurrency": "EUR", // @todo Mudar isso para o currency padrão do usuário
        "targetCurrency": expenseToBeUpdated.currency,
        "preferredPayIn":"BANK_TRANSFER"
      });
      obs = `original::${value}`;
      value = response.data.paymentOptions[0].sourceAmount;
    }

    if (expenseToBeUpdated.paid == true && expenseToBeUpdated.obs.indexOf('original::') === 0) {
      value = +expenseToBeUpdated.obs.substring('original::'.length);
    }

    await this.repository.update(id, {
      paid: !expenseToBeUpdated.paid,
      value,
      obs
    });

    const updatedExpense = await this.repository.findOne(id);

    return updatedExpense;
  }
}


export default TogglePaidService;
