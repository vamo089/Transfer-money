import { TransactionResponse } from '../../../services/getListOfTransactions';
import { TableData } from '../ListOfTransactions';

export const createData = (data: TransactionResponse[]) => {
  const parsedData: TableData[] = [];
  for (let i = 0; i < data.length; i += 1) {
    const { username, amount, date } = data[i];
    parsedData.push({ username, amount, date });
  }
  return parsedData;
};
