import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent } from "react";

import { mockRecipient } from "../mock";

interface Option {
  id: string;
  label: string;
}

interface SendFormProps {
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick: () => void;
  to: Option;
  changeTo: (option: Option) => void;
}

export function SendForm({
  title,
  value,
  onChange,
  onClick,
  to,
  changeTo,
}: SendFormProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "8px",
        width: "300px",
      }}
    >
      <Typography sx={{ textTransform: "uppercase" }}>{title}</Typography>
      <TextField
        value={value}
        type="number"
        onChange={(e) => onChange(e)}
        disabled={to.label.startsWith("No")}
      />
      <TextField
        select
        value={to.label}
        onChange={(e) =>
          changeTo(
            mockRecipient.find((option) => option.label === e.target.value) ||
              mockRecipient[0]
          )
        }
      >
        {mockRecipient.map((item) => (
          <MenuItem key={item.id} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        onClick={onClick}
        disabled={to.label.includes("No") || value === "0" || Number(value) < 0}
      >
        {title}
      </Button>
    </Card>
  );
}
