import React from "react";
import { theme } from "helpers/theme";
import { TransactionResponse } from "services/getListOfTransactions";
import styled from "styled-components";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Typography,
  TableSortLabel,
  TableRow,
  Paper as _Paper,
  Toolbar as _Toolbar,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "store";

const Toolbar = styled(_Toolbar)`
  border-bottom: 1px solid ${theme.colors.primary};
`;

const Paper = styled(_Paper)`
  height: 100%;
`;

interface TableData {
  username: string;
  amount: string;
  date: string;
}
const createData = (data: TransactionResponse[]) => {
  const parsedData: TableData[] = [];
  for (let i = 0; i < data.length; i++) {
    const { username, amount, date } = data[i];
    parsedData.push({ username, amount, date });
  }
  return parsedData;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "username", numeric: false, disablePadding: true, label: "Username" },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onRequestSort } = props;
  const createSortHandler = (property: keyof TableData) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell> </TableCell>
        {headCells.map((headCell) => (
          <TableCell align="left">
            <TableSortLabel onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography variant="h6" component="div">
        Previous transactions
      </Typography>
    </Toolbar>
  );
};

export const ListOfTransactions = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof TableData>("username");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const previousTransactionData = useSelector<
    RootState,
    TransactionResponse[]
  >((state) => state.account.previousTransactionData);

  const tableData = createData(previousTransactionData);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper>
        <EnhancedTableToolbar />
        {tableData.length ? (
          <>
            <TableContainer>
              <Table>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={tableData.length}
                />
                <TableBody>
                  {stableSort(tableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow>
                          <TableCell> </TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell align="left">{row.amount}</TableCell>
                          <TableCell align="left">{row.date}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(event: unknown, newPage: number) =>
                setPage(newPage)
              }
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        ) : (
          "No transactions in your history yet"
        )}
      </Paper>
    </>
  );
};
