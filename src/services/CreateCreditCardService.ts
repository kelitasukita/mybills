import CreditCard from "../models/CreditCard";
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

  public async execute(data: CreditCardData): Promise<CreditCard | null> {

    const creditcard = await this.creditcardRepository.createCreditCard(data);

    return creditcard;
  }

}

export default CreateCreditCardService;
