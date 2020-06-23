import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const { total } = balance;

    if(type === 'outcome' && total < value) {
      throw Error('Outcome value cannot be higher than income');
      
    };

    const transaction = this.transactionsRepository.create({title, value, type})

    return transaction;
  }
}

export default CreateTransactionService;
