import { AlgoOrderRootType, API } from "@orderly.network/types";
import {
  cn,
  Flex,
  modal,
  useModal,
  Text,
  Box,
  Badge,
  Divider,
} from "@orderly.network/ui";
import { TPSLWidget, TPSLWidgetProps } from "./tpsl.widget";
import { PositionTPSLConfirm } from "./tpsl.ui";
import { useMemo, useState } from "react";
import { useLocalStorage, useMarkPrice } from "@orderly.network/hooks";

type TPSLSheetProps = {
  position: API.Position;
  order?: API.AlgoOrder;
  // label: string;
  // baseDP?: number;
  // quoteDP?: number;
  symbolInfo: API.SymbolExt;
  isEditing?: boolean;
};

export const PositionTPSLSheet = (props: TPSLWidgetProps & TPSLSheetProps) => {
  const { position, symbolInfo } = props;
  const { resolve, hide, updateArgs } = useModal();

  const [needConfirm] = useLocalStorage("orderly_position_tp_sl_confirm", true);

  const updateSheetTitle = (title: string) => {
    updateArgs({ title });
  };

  const onCompleted = () => {
    resolve();
    hide();
  };

  const { quote_dp, base_dp } = symbolInfo;

  return (
    <>
      <PositionInfo position={position} symbolInfo={symbolInfo} />

      <TPSLWidget
        {...props}
        onTPSLTypeChange={(type) => {
          updateSheetTitle(
            type === AlgoOrderRootType.TP_SL ? "TP/SL" : "Position TP/SL"
          );
        }}
        onComplete={onCompleted}
        onConfirm={(order, options) => {
          if (!needConfirm) {
            return Promise.resolve(true);
          }

          return modal
            .confirm({
              title: "Confirm Order",
              bodyClassName: "oui-pb-0 lg:oui-pb-0",
              onOk: () => {
                return options.submit();
              },
              content: (
                <PositionTPSLConfirm
                  symbol={order.symbol!}
                  qty={Number(order.quantity)}
                  maxQty={Number(position.position_qty)}
                  tpPrice={Number(order.tp_trigger_price)}
                  slPrice={Number(order.sl_trigger_price)}
                  side={order.side!}
                  quoteDP={quote_dp ?? 2}
                  baseDP={base_dp ?? 2}
                />
              ),
            })
            .then(
              () => {
                // setOpen(false);
                // setVisible(true);
                return true;
              },
              () => {
                // setVisible(true);
                return Promise.reject(false);
              }
            );
        }}
      />
    </>
  );
};

export const TPSLSheetTitle = () => {
  const modal = useModal();

  const title = useMemo<string>(() => {
    return (modal.args?.title || "TP/SL") as string;
  }, [modal.args?.title]);

  return <span>{title}</span>;
};

export const PositionInfo = (props: {
  position: API.Position;
  symbolInfo: API.SymbolExt;
}) => {
  const { position, symbolInfo } = props;
  const { data: markPrice } = useMarkPrice(position.symbol);
  const modal = useModal();
  const isPositionTPSL = useMemo(() => {
    return modal.args?.title === "Position TP/SL";
  }, [modal.args?.title]);
  return (
    <>
      <Flex justify={"between"} pb={3} itemAlign={"center"}>
        <Text.formatted rule="symbol" className="oui-text-xs" showIcon>
          {position.symbol}
        </Text.formatted>
        <Flex gapX={1}>
          {isPositionTPSL && <Badge size="xs">Position</Badge>}
          <Badge size="xs" color="neutral">
            TP/SL
          </Badge>
          {position.position_qty > 0 ? (
            <Badge size="xs" color="buy">
              Buy
            </Badge>
          ) : (
            <Badge size="xs" color="sell">
              Sell
            </Badge>
          )}
        </Flex>
      </Flex>
      <Divider intensity={8} />
      <Box py={3}>
        <Flex justify={"between"}>
          <Text size="sm" intensity={54}>
            Avg. open
          </Text>
          <Text.numeral
            className="oui-text-xs"
            unit={symbolInfo.quote}
            dp={symbolInfo.quote_dp}
            unitClassName="oui-ml-1 oui-text-base-contrast-36"
          >
            {position.average_open_price}
          </Text.numeral>
        </Flex>
        <Flex justify={"between"}>
          <Text size="sm" intensity={54}>
            Mark price
          </Text>
          <Text.numeral
            className="oui-text-xs"
            unit={symbolInfo.quote}
            dp={symbolInfo.quote_dp}
            unitClassName="oui-ml-1 oui-text-base-contrast-36"
          >
            {markPrice}
          </Text.numeral>
        </Flex>
      </Box>
    </>
  );
};
