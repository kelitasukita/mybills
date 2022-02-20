import { EntityRepository, Repository } from 'typeorm';
import CreditCard from '../models/CreditCard';

interface CreditCardData {
  brand: string;
  name: string;
  due_day: bigint;
  limit: number;

}

@EntityRepository(CreditCard)
class CreditCardRepository extends Repository<CreditCard> {
  public async createCreditCard(data: CreditCardData): Promise<CreditCard> {

    const creditcard = this.create(data);

    return await this.save(creditcard);
  }
}

export default CreditCardRepository;
