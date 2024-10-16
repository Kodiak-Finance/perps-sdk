import {
  Button,
  Popover,
  toast,
  Text,
  CloseIcon,
  Flex,
  Box,
  Divider,
  cn,
  NumeralProps,
  Badge,
} from "@orderly.network/ui";
import { usePositionsRowContext } from "./positionRowContext";
// import { useSymbolContext } from "../providers/symbolProvider";
import { FC, useMemo, useState } from "react";
import { OrderEntity, OrderSide, OrderType } from "@orderly.network/types";
import { commify, commifyOptional, Decimal } from "@orderly.network/utils";
import { TokenIcon } from "@orderly.network/ui";
import { useSymbolContext } from "../../providers/symbolProvider";

export const CloseButton = () => {
  const [open, setOpen] = useState(false);
  const {
    onSubmit,
    price,
    quantity,
    closeOrderData,
    type,
    submitting,
    quoteDp,
  } = usePositionsRowContext();

  const { base, quote } = useSymbolContext();

  const onConfirm = () => {
    return onSubmit().then(
      (res) => {
        setOpen(false);
      },
      (error: any) => {
        if (typeof error === "string") {
          toast.error(error);
        } else {
          toast.error(error.message);
        }
      }
    );
  };

  const onClose = () => {
    setOpen(false);
  };

  const disabled = useMemo(() => {
    if (type === OrderType.MARKET) {
      if (!quantity) {
        return true;
      }
      return false;
    }

    return !price || !quantity;
  }, [price, quantity, type]);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      contentProps={{
        className: "oui-w-[360px] oui-px-5 oui-rounded-xl",
      }}
      content={
        type === OrderType.MARKET ? (
          <MarketCloseConfirm
            base={base}
            quantity={quantity}
            onClose={onClose}
            onConfirm={onConfirm}
            submitting={submitting}
          />
        ) : (
          <LimitConfirmDialog
            base={base}
            quantity={quantity}
            price={price}
            onClose={onClose}
            onConfirm={onConfirm}
            submitting={submitting}
            quoteDp={quoteDp}
            order={closeOrderData}
          />
        )
      }
    >
      <Button
        variant="outlined"
        size="sm"
        color="secondary"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Close
      </Button>
    </Popover>
  );
};

export const ConfirmHeader: FC<{
  onClose?: () => void;
  title: string;
  hideCloseIcon?: boolean;
}> = (props) => {
  const { hideCloseIcon = false } = props;
  return (
    <div className="oui-pb-3 oui-border-b oui-border-line-4 oui-relative oui-w-full">
      <Text size={"base"}>{props.title}</Text>
      {!hideCloseIcon && (
        <button
          onClick={props.onClose}
          className="oui-absolute oui-right-0 oui-top-0 oui-text-base-contrast-54 hover:oui-text-base-contrast-80 oui-p-2"
        >
          <CloseIcon size={18} color="white" />
        </button>
      )}
    </div>
  );
};

export const ConfirmFooter: FC<{
  onConfirm?: () => Promise<any>;
  onCancel?: () => void;
  submitting?: boolean;
}> = ({ onCancel, onConfirm, submitting }) => {
  return (
    <Flex
      id="oui-positions-confirm-footer"
      gap={2}
      width={"100%"}
      className="oui-mt-3 oui-pb-1"
    >
      <Button
        id="oui-positions-confirm-footer-cancel-button"
        color={"secondary"}
        fullWidth
        onClick={onCancel}
        size="md"
      >
        Cancel
      </Button>
      <Button
        id="oui-positions-confirm-footer-confirm-button"
        onClick={onConfirm}
        fullWidth
        loading={submitting}
        size="md"
      >
        Confirm
      </Button>
    </Flex>
  );
};

export const OrderDetail = (props: {
  quantity: any;
  price: any;
  side: OrderSide;
  quoteDp: number;
  className?: string;
}) => {
  const { quantity, price, quoteDp, side } = props;

  const total = useMemo(() => {
    if (price && quantity) {
      return new Decimal(price)
        .mul(quantity)
        .toFixed(quoteDp, Decimal.ROUND_DOWN);
    }
    return "--";
  }, [price, quantity]);

  return (
    <Flex
      direction={"column"}
      gap={1}
      width={"100%"}
      className="oui-text-sm oui-text-base-contrast-54"
      py={5}
    >
      <Flex justify={"between"} width={"100%"} gap={1}>
        <Text>Qty.</Text>
        <Text color={side === OrderSide.BUY ? "success" : "danger"}>
          {quantity}
        </Text>
      </Flex>
      <Flex justify={"between"} width={"100%"} gap={1}>
        <Text>Price</Text>
        <Text.formatted
          intensity={98}
          suffix={<Text intensity={54}>USDC</Text>}
        >
          {price}
        </Text.formatted>
      </Flex>
      <Flex justify={"between"} width={"100%"} gap={1}>
        <Text>Total</Text>
        <Text.formatted
          intensity={98}
          suffix={<Text intensity={54}>USDC</Text>}
        >
          {total}
        </Text.formatted>
      </Flex>
    </Flex>
  );
};

export const MarketCloseConfirm: FC<{
  base?: string;
  quantity?: string;
  onClose?: () => void;
  close?: () => void;
  onConfirm?: () => Promise<any>;
  submitting?: boolean;
  hideCloseIcon?: boolean;
}> = (props) => {
  console.log("props", props);

  const onCancel = () => {
    const func = props?.onClose ?? props.close;
    console.log("xxxxxxxxxxx func is", func);
    func?.();
  };
  return (
    <Flex direction={"column"}>
      <ConfirmHeader
        onClose={onCancel}
        title="Market Close"
        hideCloseIcon={props.hideCloseIcon}
      />
      <Text intensity={54} size="sm" className="oui-my-5">
        {`You agree closing ${commifyOptional(props.quantity)} ${
          props.base
        } position at market price.`}
      </Text>
      <ConfirmFooter
        onCancel={onCancel}
        onConfirm={async () => {
          await props.onConfirm?.();
          onCancel();
        }}
        submitting={props.submitting}
      />
    </Flex>
  );
};

export const LimitConfirmDialog: FC<{
  base: string;
  quantity: string;
  price: string;
  onClose?: () => void;
  onConfirm: () => Promise<any>;
  order: OrderEntity;
  submitting: boolean;
  quoteDp?: number;
  hideCloseIcon?: boolean;
}> = (props) => {
  const { order, quoteDp, quantity, price, submitting } = props;

  const { side } = order;
  const onCancel = () => {
    props.onClose?.();
  };
  return (
    <>
      <ConfirmHeader
        onClose={onCancel}
        title="Limit close"
        hideCloseIcon={props.hideCloseIcon}
      />
      <Text intensity={54} size="sm" className="oui-mt-5">
        {`You agree closing ${commify(props.quantity)} ${
          props.base
        } position at limit price.`}
      </Text>

      <Flex gap={2} mb={4} mt={5} justify={"between"}>
        <Text.formatted
          rule="symbol"
          formatString="base-type"
          size="base"
          showIcon
        >
          {order.symbol}
        </Text.formatted>
        <Flex gap={1}>
          <Badge color="neutral" size="xs">
            Limit
          </Badge>
          <Badge
            color={side === OrderSide.BUY ? "success" : "danger"}
            size="xs"
          >
            {side === OrderSide.BUY ? "Buy" : "Sell"}
          </Badge>
        </Flex>
      </Flex>

      <Divider className="oui-w-full" />

      <OrderDetail
        className="oui-text-sm"
        price={price}
        quantity={quantity}
        side={order.side}
        quoteDp={quoteDp ?? 2}
      />
      <ConfirmFooter
        onCancel={onCancel}
        onConfirm={props.onConfirm}
        submitting={props.submitting}
      />
    </>
  );
};
