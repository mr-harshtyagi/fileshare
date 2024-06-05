import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";

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
  {
    key: "actions",
    label: "Actions",
  },
];

export default function SharedFilesTable() {
  const [loading, setLoading] = useState(false);
  const [fileCid, setFileCid] = useState("");
  const rows = [
    {
      key: "1",
      name: "filessssffjslfjlsfjlksjflsjflksjf1.txt",
      size: "1.5 KB",
      date: "2021-12-01",
      actions: (
        <div className="flex gap-4">
          <Button>Download </Button>
        </div>
      ),
    },
    {
      key: "2",
      name: "file2.txt",
      size: "2.0 KB",
      date: "2021-12-02",
      actions: (
        <div className="flex gap-4">
          <Button>Download </Button>
        </div>
      ),
    },
    {
      key: "3",
      name: "file3.txt",
      size: "1.8 KB",
      date: "2021-12-03",
      actions: (
        <div className="flex gap-4">
          <Button>Download </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table aria-label="my files table">
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
    </>
  );
}
