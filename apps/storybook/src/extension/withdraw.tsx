import { ExtensionPositionEnum, installExtension } from "@orderly.network/ui";
import { WithdrawFormWidgetProps } from "@orderly.network/ui-transfer";

const CustomWithdrawForm = (props: WithdrawFormWidgetProps) => {
  return <div>custom withdraw form</div>;
};

export function installWithdrawExtension() {
  installExtension<WithdrawFormWidgetProps>({
    name: "withdraw-form",
    scope: ["*"],
    positions: [ExtensionPositionEnum.WithdrawForm],
    __isInternal: false,
  })((props: WithdrawFormWidgetProps) => {
    return <CustomWithdrawForm close={props.close} />;
  });
}
