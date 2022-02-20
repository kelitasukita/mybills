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

  public async execute(data: CreditCardData): Promise<CreditCard> {
    const schema = this.validationSchema();

    await schema.validate(data, { abortEarly: false })
      .catch((err: Yup.ValidationError) => {
        throw Error(err.errors.join(', '))
      });

    if (await this.creditcardRepository.findOne({ where: data })) {
      throw Error('This card already exists.')
    }

    return await this.creditcardRepository.createCreditCard(data);
  }

  private validationSchema() {
    return Yup.object().shape({
      brand: Yup
        .string()
        .max(50)
        .matches(/^\S[aA-zZ ]+$/, 'Brand needs to use spaces or letters only')
        .required("Brand is required."),
      name: Yup.string()
        .max(50)
        .matches(/^\S[aA-zZ ]+$/, 'Name needs to use spaces or letters only')
        .required("Name is required."),
      due_day: Yup.number()
        .integer()
        .positive()
        .min(1)
        .max(31)
        .required("Insert a valid number."),
      limit: Yup.number()
        .positive()
        .required("Insert a valid number."),
    });
  }
};

export default CreateCreditCardService;
