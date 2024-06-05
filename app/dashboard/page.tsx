"use client";
import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Tabs, Tab } from "@nextui-org/tabs";

export default function DashboardPage() {
  const router = useRouter();
  const { isConnected } = useAccount();

  if (!isConnected) {
    router.push("/");
  }
  return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="my_files" title="My Files">
            abcd
          </Tab>
          <Tab key="shared_with_me" title="Shared with me">
            def
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
