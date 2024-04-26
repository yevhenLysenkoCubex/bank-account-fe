import { useEffect, useState } from "react";
import { HandleForm } from "./components/handle-form";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { SendForm } from "./components/send-form";
import { IMockOperations, mock, mockOperations } from "./mock";
import { filterArray, getReadableDate, sort } from "./utils";
import { TableComponent } from "./components/table";
import { MenuItem, TextField } from "@mui/material";

export type ISort = "asc" | "desc";

export type IFilters = {
  date: string;
  amount: string;
  balance: string;
};

function App() {
  const [money, setMoney] = useState("1000");
  const [deposit, setDeposit] = useState("0");
  const [withdraw, setWithdraw] = useState("0");
  const [send, setSend] = useState("0");
  const [to, setTo] = useState(mock[0]);

  const [sorting, setSorting] = useState<ISort>("desc");
  const [filter, setFilter] = useState<IFilters>({
    date: "",
    amount: "",
    balance: "",
  });

  const [displayOperations, setDisplayOperations] =
    useState<IMockOperations[]>(mockOperations);

  const [operations, setOperations] =
    useState<IMockOperations[]>(mockOperations);

  const handleDeposit = () => {
    if (Number(deposit) < 0) {
      setMoney((prev) => prev);
      setDeposit("0");
      return;
    }
    setMoney((prev) => String(Number(prev) + Number(deposit)));
    setOperations((prev) => [
      {
        date: getReadableDate(),
        amount: deposit,
        balance: String(Number(money) + Number(deposit)),
        id: uuidv4(),
      },
      ...prev,
    ]);
  };

  const handleWithDraw = () => {
    if (Number(withdraw) < 0) {
      setMoney((prev) => prev);
      setWithdraw("0");
      return;
    }
    setMoney((prev) => String(Number(prev) - Number(withdraw)));
    setOperations((prev) => [
      {
        date: getReadableDate(),
        amount: `-${withdraw}`,
        balance: String(Number(money) - Number(withdraw)),
        id: uuidv4(),
      },
      ...prev,
    ]);
  };

  const handleSend = () => {
    if (Number(send) < 0) {
      return;
    }
    setMoney((prev) => String(Number(prev) - Number(send)));
    setOperations((prev) => [
      {
        date: getReadableDate(),
        amount: `-${send}`,
        balance: String(Number(money) - Number(send)),
        id: uuidv4(),
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    const filtered = filterArray(operations, filter);
    setDisplayOperations(sort(filtered, sorting));
  }, [filter, operations, sorting]);

  const updateFilter = (obj: Partial<IFilters>) => {
    setFilter((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ paddingTop: "8px", height: "100vh", overflow: "scroll" }}
    >
      <Typography>MONEY {money}</Typography>
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
          onChange={(e) => setDeposit(e.target.value)}
          onClick={handleDeposit}
        />
        <HandleForm
          title="Withdraw"
          value={withdraw}
          onChange={(e) => setWithdraw(e.target.value)}
          onClick={handleWithDraw}
        />
        <SendForm
          title="Send"
          value={send}
          onChange={(e) => setSend(e.target.value)}
          onClick={handleSend}
          to={to}
          changeTo={setTo}
        />
      </Stack>

      <Box mb={2} display="flex" gap={2} flexDirection="column">
        <Box>
          <TextField
            select
            value={sorting}
            onChange={(e) => setSorting(e.target.value as ISort)}
          >
            {["asc", "desc"].map((item) => (
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
          value={filter.date}
          onChange={(e) => updateFilter({ date: e.target.value })}
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
      <TableComponent data={displayOperations} />
    </Container>
  );
}

export default App;
