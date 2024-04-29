import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSnapshot } from "valtio";

import { HandleForm } from "./components/handle-form";
import { SendForm } from "./components/send-form";
import { mockRecipient } from "./mock";
import { filterArray, sort } from "./utils";
import { TableComponent } from "./components/table";
import { CircularProgress, MenuItem, TextField } from "@mui/material";
import type { IFilters, IOperation, ISort } from "./types";
import { projectStore, projectStoreMutations } from "./store";

function App() {
  const { operations, totalAmount, isLoading, deposit, withdraw, send } =
    useSnapshot(projectStore);

  const [to, setTo] = useState(mockRecipient[0]);

  const [filtered, setFiltered] = useState(operations);

  const [sorting, setSorting] = useState<ISort>("desc");
  const [filter, setFilter] = useState<IFilters>({
    updatedAt: "",
    amount: "",
    balance: "",
  });

  const handleDeposit = () => {
    projectStoreMutations.deposit(deposit).then(() => {
      projectStoreMutations.fetchTotalAmount();
      projectStoreMutations.changeDeposit("0");
    });
  };

  const handleWithDraw = () => {
    projectStoreMutations.withdraw(withdraw).then(() => {
      projectStoreMutations.fetchTotalAmount();
      projectStoreMutations.changeWithdraw("0");
    });
  };

  const handleSend = () => {
    projectStoreMutations.send(send).then(() => {
      projectStoreMutations.fetchTotalAmount();
      projectStoreMutations.changeSend("0");
    });
  };

  useEffect(() => {
    const filtered = filterArray(operations as IOperation[], filter);
    setFiltered(sort(filtered, sorting));
  }, [sorting, filter, operations]);

  const updateFilter = (obj: Partial<IFilters>) => {
    setFilter((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    projectStoreMutations.fetchTotalAmount();
  }, []);

  useEffect(() => {
    projectStoreMutations.fetchOperations();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ paddingTop: "8px", height: "100vh", overflow: "scroll" }}
    >
      <Typography>MONEY {totalAmount}</Typography>
      <Stack
        direction="row"
        gap={2}
        justifyContent="space-around"
        mb={3}
        sx={{ flexWrap: "wrap" }}
      >
        <HandleForm
          title="Deposit"
          value={deposit}
          onChange={(e) => projectStoreMutations.changeDeposit(e.target.value)}
          onClick={handleDeposit}
        />
        <HandleForm
          title="Withdraw"
          value={withdraw}
          onChange={(e) => projectStoreMutations.changeWithdraw(e.target.value)}
          onClick={handleWithDraw}
        />
        <SendForm
          title="Send"
          value={send}
          onChange={(e) => projectStoreMutations.changeSend(e.target.value)}
          onClick={handleSend}
          to={to}
          changeTo={setTo}
        />
      </Stack>

      <Box mb={2} display="flex" gap={2} flexDirection="column">
        <Box>
          <TextField
            select
            disabled={filtered.length === 0}
            value={sorting}
            onChange={(e) => setSorting(e.target.value as ISort)}
          >
            {[
              "asc",
              "desc",
              "amountAsc",
              "amountDesc",
              "balanceAsc",
              "balanceDesc",
            ].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TextField
          fullWidth
          autoComplete="off"
          placeholder="Filter by date"
          name="date"
          value={filter.updatedAt}
          onChange={(e) => updateFilter({ updatedAt: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="off"
          name="amount"
          placeholder="Filter by amount"
          value={filter.amount}
          onChange={(e) => updateFilter({ amount: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="off"
          placeholder="Filter by balance"
          value={filter.balance}
          onChange={(e) => updateFilter({ balance: e.target.value })}
        />
      </Box>

      {isLoading ? <CircularProgress /> : <TableComponent data={filtered} />}
    </Container>
  );
}

export default App;
