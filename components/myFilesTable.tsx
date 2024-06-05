import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
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

export default function MyFilesTable() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
          <Button
            onPress={() => {
              setFileCid("filessssffjslfjlsfjlksjflsjflksjf1.txt");
              onOpen();
            }}
            color="primary"
          >
            Share{" "}
          </Button>
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
          <Button onPress={onOpen} color="primary">
            Share{" "}
          </Button>
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
          <Button onPress={onOpen} color="primary">
            Share{" "}
          </Button>
        </div>
      ),
    },
  ];

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange();
    }, 2000);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share your file
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="flex flex-col items-center gap-4 justify-center">
                    <Spinner />
                    <p>Please wait...</p>
                  </div>
                ) : (
                  <>
                    <p>File : {fileCid}</p>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        type="text"
                        label="Wallet Address"
                        placeholder="Enter receiver's wallet address"
                      />
                    </div>
                  </>
                )}
              </ModalBody>
              {!loading && (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={handleUpload}>
                    Upload
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
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
