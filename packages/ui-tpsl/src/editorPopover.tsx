import { ReactNode } from "react";
import { ComputedAlgoOrder, useLocalStorage } from "@kodiak-finance/orderly-hooks";
import { useTranslation } from "@kodiak-finance/orderly-i18n";
import { AlgoOrderRootType, API, PositionType } from "@kodiak-finance/orderly-types";
import { Box, Button, modal, toast } from "@kodiak-finance/orderly-ui";
import { ButtonProps } from "@kodiak-finance/orderly-ui";
import { TPSLDialogId } from "./positionTPSL";

export const PositionTPSLPopover = (props: {
  position: API.Position;
  order?: API.AlgoOrder;
  label?: string;
  baseDP?: number;
  quoteDP?: number;
  /**
   * Button props
   */
  buttonProps?: ButtonProps;
  isEditing?: boolean;
  children?: ReactNode;
}) => {
  const { position, order, baseDP, quoteDP, buttonProps, isEditing } = props;

  const [needConfirm] = useLocalStorage("orderly_order_confirm", true);

  const { t } = useTranslation();

  const isPositionTPSL = isEditing
    ? order?.algo_type === AlgoOrderRootType.POSITIONAL_TP_SL
    : undefined;

  const onEdit = () => {
    modal.show(TPSLDialogId, {
      order: order,
      symbol: position.symbol,
      baseDP: baseDP,
      quoteDP: quoteDP,
      positionType: isPositionTPSL ? PositionType.FULL : PositionType.PARTIAL,
      isEditing: isEditing,
    });
  };

  return (
    <Box onClick={onEdit} className="oui-cursor-pointer">
      {props.children || (
        <Button
          variant="outlined"
          size="sm"
          color="secondary"
          {...buttonProps}
          // onClick={() => {
          //   setOpen(true);
          // }}
        >
          {props.label}
        </Button>
      )}
    </Box>
  );
};
