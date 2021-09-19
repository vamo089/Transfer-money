import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

import { Order, OrderTypes, TableData } from '../ListOfTransactions';
import { headCellData } from './headCellData';

type Props = {
  order: Order;
  orderBy: keyof TableData;
  rowCount: number;
  setOrder: Dispatch<SetStateAction<Order>>;
  setOrderBy: Dispatch<SetStateAction<keyof TableData>>;
};

export const HeadCell: React.FC<Props> = (props) => {
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableData) => {
    const isAsc = props.orderBy === property && props.order === OrderTypes.Asc;
    props.setOrder(isAsc ? OrderTypes.Desc : OrderTypes.Asc);
    props.setOrderBy(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell> </TableCell>
        {headCellData.map((headCell) => (
          <TableCell align="left" key={headCell.id}>
            <TableSortLabel onClick={(e) => handleRequestSort(e, headCell.id)}>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
