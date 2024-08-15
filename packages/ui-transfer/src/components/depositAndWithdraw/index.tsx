import { FC, useState } from "react";
import { registerSimpleDialog, TabPanel, Tabs } from "@orderly.network/ui";
import { DepositIcon, WithdrawIcon } from "../../icons";
import { WithdrawFormWidget } from "../withdrawForm";
import { DepositSlot } from "./plugin";

export const DepositAndWithdrawWithDialogId = "DepositAndWithdrawWithDialogId";

export type DepositAndWithdrawProps = {
  activeTab?: "deposit" | "withdraw";
  close?: () => void;
};

export const DepositAndWithdraw: FC<DepositAndWithdrawProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>(
    props.activeTab || "deposit"
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      variant="contained"
      size="lg"
      classNames={{
        tabsList: "oui-px-0",
        tabsContent: "oui-pt-5",
      }}
    >
      <TabPanel title="Deposit" icon={<DepositIcon />} value="deposit">
        <DepositSlot onClose={props.close} />
      </TabPanel>
      <TabPanel title="Withdraw" icon={<WithdrawIcon />} value="withdraw">
        <WithdrawFormWidget {...props} />
      </TabPanel>
    </Tabs>
  );
};

registerSimpleDialog(DepositAndWithdrawWithDialogId, DepositAndWithdraw, {
  size: "md",
  bodyClassName: "oui-pt-3",
});
