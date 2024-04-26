import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent } from "react";

interface HandleFormProps {
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick: () => void;
}

export function HandleForm({
  title,
  value,
  onChange,
  onClick,
}: HandleFormProps) {
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
      <TextField value={value} type="number" onChange={(e) => onChange(e)} />
      <Button
        onClick={onClick}
        disabled={value === "0" || value.startsWith("0") || Number(value) === 0}
      >
        {title}
      </Button>
    </Card>
  );
}
