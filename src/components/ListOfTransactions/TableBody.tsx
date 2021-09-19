import { TableBody as TableBodyElement, TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';

import { Order, TableData } from './ListOfTransactions';
import { getComparator } from './utils/getComparator';
import { stableSort } from './utils/stableSort';

type Props = {
  order: Order;
  orderBy: keyof TableData;
  tableData: TableData[];
  page: number;
  rowsPerPage: number;
};
export const TableBody: React.FC<Props> = (props) => (
  <TableBodyElement>
    {stableSort(props.tableData, getComparator(props.order, props.orderBy))
      .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
      .map((row) => (
        <TableRow key={row.date + row.amount}>
          <TableCell> </TableCell>
          <TableCell>{row.username}</TableCell>
          <TableCell align="left">{row.amount}</TableCell>
          <TableCell align="left">{row.date}</TableCell>
        </TableRow>
      ))}
  </TableBodyElement>
);
