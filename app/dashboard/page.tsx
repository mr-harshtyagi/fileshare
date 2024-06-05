"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import MyFilesTable from "@/components/myFilesTable";
import SharedFilesTable from "@/components/sharedFilesTable";

export default function DashboardPage() {
  const router = useRouter();
  const { isConnected } = useAccount();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [uploading, setUploading] = useState(false);

  if (!isConnected) {
    router.push("/");
  }

  const handleUpload = () => {
    console.log("uploading...");
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
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
                Upload your file
              </ModalHeader>
              <ModalBody>
                {uploading ? (
                  <div className="flex flex-col items-center gap-4 justify-center">
                    <Spinner />
                    <p>Uploading file...</p>
                  </div>
                ) : (
                  <>
                    <p>Please select your file to upload.</p>
                    <input type="file" />
                  </>
                )}
              </ModalBody>
              {!uploading && (
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

      <div className="flex justify-end px-8">
        <Button color="primary" onPress={onOpen}>
          + Upload File
        </Button>
      </div>

      <div className="flex w-full flex-col justify-end">
        <Tabs aria-label="Options">
          <Tab key="my_files" title="My Files">
            <MyFilesTable />
          </Tab>
          <Tab key="shared_with_me" title="Shared with me">
            <SharedFilesTable />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
