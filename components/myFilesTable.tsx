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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "uuid",
    label: "UUID",
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

export default function MyFilesTable({ walletAddress }: any) {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fileCid, setFileCid] = useState("");
  const [rows, setRows] = useState<any>([]); // [] as initial value

  useEffect(() => {
    setLoading(true);
    readFiles();
  }, []);

  const readFiles = async () => {
    const formData = new FormData();
    const directoryUuid = localStorage.getItem(walletAddress);
    formData.append("directoryUuid", directoryUuid as string);
    formData.append("walletAddress", "0x1234567890");

    try {
      const response = await fetch("/api/apillion/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      console.log("File read successfully:", data);
      const tableRows = data.data.items.map((file: any) => {
        return {
          key: file.uuid,
          name: file.name,
          uuid: file.uuid,
          date: new Date(file.createTime).toDateString(),
          actions: (
            <div className="flex gap-4">
              <Button onClick={() => window.open(file.link, "_blank")}>
                Download{" "}
              </Button>
              <Button
                onPress={() => {
                  setFileCid(`${file.name} (${file.uuid}) `);
                  onOpen();
                }}
                color="primary"
              >
                Share{" "}
              </Button>
            </div>
          ),
        };
      });
      setRows(tableRows);
      setLoading(false);
    } catch (error) {
      console.error("Error reading file:", error);
    }
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
            </>
          )}
        </ModalContent>
      </Modal>
      {loading ? (
        <div className="flex justify-center w-full mt-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table aria-label="my files table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row.key}>
                {(columnKey: any) => (
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
