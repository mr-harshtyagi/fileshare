import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "file1.txt",
    size: "1.5 KB",
    date: "2021-12-01",
  },
];

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "date",
    label: "Date",
  },
];

export default function SharedFilesTable() {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            {(columnKey: any) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
