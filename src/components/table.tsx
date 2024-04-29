import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { IOperation } from "../types";

const columns = [
  {
    header: "Date",
    accessorKey: "createdAt",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Balance",
    accessorKey: "balance",
  },
];

interface TableComponentProps {
  data: readonly IOperation[];
}

export function TableComponent({ data }: TableComponentProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.accessorKey}>{c.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((operation) => (
              <TableRow key={operation.id}>
                {columns.map((col, i) => (
                  <TableCell key={i}>
                    {operation[col.accessorKey as keyof IOperation]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={
          data.length > 10 ? [10, 20] : data.length > 20 ? [10, 20, 30] : []
        }
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
