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
  public async createCreditCard(brand: string, name: string, due_day: bigint, limit: number): Promise<CreditCard> {

    const creditcard = await this.create({
      brand,
      name,
      due_day,
      limit
    });

    return this.save(creditcard);

  }

  public async isDuplicated(brand: string, name: string, due_day: bigint, limit: number): Promise<CreditCard | undefined> {

    const creditcard = await this.findOne({
      where: {
        brand,
        name,
        due_day,
        limit
      }
    });

    return creditcard;
  }
}
export default CreditCardRepository;
