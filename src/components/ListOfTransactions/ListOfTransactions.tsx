import { Paper as _Paper, Table, TableContainer, TablePagination } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TransactionResponse } from 'services/getListOfTransactions';
import { RootState } from 'store';
import styled from 'styled-components';

import { HeadCell } from './HeadCell/HeadCell';
import { TableBody } from './TableBody';
import { TableTitle } from './TableTitle';
import { createData } from './utils/createData';

const Paper = styled(_Paper)`
  height: 100%;
`;

export interface TableData {
  username: string;
  amount: string;
  date: string;
}

export enum OrderTypes {
  Asc = 'asc',
  Desc = 'desc'
}
export type Order = OrderTypes.Asc | OrderTypes.Desc;

export const ListOfTransactions = () => {
  const [order, setOrder] = useState<Order>(OrderTypes.Asc);
  const [orderBy, setOrderBy] = useState<keyof TableData>('username');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const previousTransactionData = useSelector<RootState, TransactionResponse[]>(
    (state) => state.account.previousTransactionData
  );

  const tableData = createData(previousTransactionData);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper>
        <TableTitle />
        {tableData.length ? (
          <>
            <TableContainer>
              <Table>
                <HeadCell
                  order={order}
                  orderBy={orderBy}
                  rowCount={tableData.length}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                />
                <TableBody
                  order={order}
                  orderBy={orderBy}
                  tableData={tableData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(event: unknown, newPage: number) => setPage(newPage)}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        ) : (
          'No transactions in your history yet'
        )}
      </Paper>
    </>
  );
};
