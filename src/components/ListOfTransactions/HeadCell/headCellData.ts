import { TableData } from '../ListOfTransactions';

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

export const headCellData: HeadCell[] = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' }
];
