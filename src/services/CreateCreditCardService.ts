import { max } from 'date-fns';
import * as Yup from 'yup';

import CreditCard from '../models/CreditCard';
import CreditCardRepository from '../repositories/CreditCardRepository';

interface CreditCardData {
  brand: string;
  name: string;
  due_day: bigint;
  limit: number;
}

class CreateCreditCardService {
  private creditcardRepository: CreditCardRepository;

  constructor(repository: CreditCardRepository) {
    this.creditcardRepository = repository;
  }

  public async execute({ brand, name, due_day, limit }: CreditCardData): Promise<CreditCard> {
    const schema = Yup.object().shape({
      brand: Yup.string().max(50).matches(/^\S[aA-zZ ]+$/).required("Brand needs to be informed."),
      name: Yup.string().max(50).matches(/^\S[aA-zZ ]+$/).required("Name needs to be informed."),
      due_day: Yup.number().integer().positive().min(1).max(31).required("Insert a valid number."),
      limit: Yup.number().positive().required("Insert a valid number."),
    });

    if (!(await schema.isValid({
      brand,
      name,
      due_day,
      limit
    }))) {

      throw Error('Validation Failed!');
    }

    if (await this.creditcardRepository.isDuplicated(brand, name, due_day, limit)) {
      throw Error('This card already included!')
    }

    const creditcard = await this.creditcardRepository.createCreditCard(brand, name, due_day, limit);

    return creditcard;
  }
};

export default CreateCreditCardService;
