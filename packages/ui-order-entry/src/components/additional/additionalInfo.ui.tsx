import { Checkbox, Divider, Flex, Grid, Switch } from "@orderly.network/ui";
import { OrderlyOrder, OrderType } from "@orderly.network/types";
import { useEffect } from "react";

export type AdditionalInfoProps = {
  pinned: boolean;
  setPinned: (value: boolean) => void;
  needConfirm: boolean;
  setNeedConfirm: (value: boolean) => void;
  orderTypeExtra?: OrderType;
  onValueChange?: (key: keyof OrderlyOrder, value: any) => void;
  showExtra?: boolean;
  hidden: boolean;
  setHidden: (value: boolean) => void;
};

export const AdditionalInfo = (props: AdditionalInfoProps) => {
  const { pinned, orderTypeExtra } = props;
  const onTypeToggle = (type: OrderType) => (checked: boolean) => {
    if (props.onValueChange) {
      props.onValueChange(
        "order_type_ext" as keyof OrderlyOrder,
        checked ? type : ""
        // orderTypeExtra === type ? "" : type
      );
    }
  };

  useEffect(() => {
    props.onValueChange?.("visible_quantity", props.hidden ? 0 : 1);
  }, [props.hidden]);


  

  return (
    <div className={"oui-text-base-contrast-54"}>
      {props.showExtra && (
        <Flex
          gapX={3}
          justify={pinned ? "start" : "between"}
          mb={3}
          width={pinned ? "unset" : "100%"}
        >
          <Flex itemAlign={"center"}>
            <Checkbox
              id={"toggle_order_post_only"}
              color={"white"}
              variant={"radio"}
              checked={orderTypeExtra === OrderType.POST_ONLY}
              onCheckedChange={onTypeToggle(OrderType.POST_ONLY)}
            />
            <label
              htmlFor={"toggle_order_post_only"}
              className={"oui-text-2xs oui-ml-1"}
            >
              Post only
            </label>
          </Flex>
          <Flex itemAlign={"center"}>
            <Checkbox
              id={"toggle_order_iov"}
              color={"white"}
              variant={"radio"}
              checked={orderTypeExtra === OrderType.IOC}
              onCheckedChange={onTypeToggle(OrderType.IOC)}
            />
            <label
              htmlFor={"toggle_order_iov"}
              className={"oui-text-2xs oui-ml-1"}
            >
              IOC
            </label>
          </Flex>
          <Flex itemAlign={"center"}>
            <Checkbox
              id={"toggle_order_fok"}
              color={"white"}
              variant={"radio"}
              checked={orderTypeExtra === OrderType.FOK}
              onCheckedChange={onTypeToggle(OrderType.FOK)}
            />
            <label
              htmlFor={"toggle_order_fok"}
              className={"oui-text-2xs oui-ml-1"}
            >
              FOK
            </label>
          </Flex>
        </Flex>
      )}

      <Flex gapX={6}>
        <Flex>
          <Checkbox
            id={"toggle_order_confirm"}
            color={"white"}
            checked={props.needConfirm}
            onCheckedChange={(checked) => {
              props.setNeedConfirm(!!checked);
            }}
          />
          <label
            htmlFor={"toggle_order_confirm"}
            className={"oui-text-2xs oui-ml-1"}
          >
            Order confirm
          </label>
        </Flex>
        <Flex>
          <Checkbox
            id={"toggle_order_hidden"}
            color={"white"}
            checked={props.hidden}
            onCheckedChange={(checked: boolean) => {
              props.setHidden(checked);
            }}
          />
          <label
            htmlFor={"toggle_order_hidden"}
            className={"oui-text-2xs oui-ml-1"}
          >
            Hidden
          </label>
        </Flex>
      </Flex>
      {!pinned && (
        <>
          <Divider className={"oui-my-3"} />
          <Flex>
            <Switch
              id={"toggle_order_keep_visible"}
              onCheckedChange={(checked) => {
                props.setPinned(checked);
              }}
            />
            <label
              htmlFor={"toggle_order_keep_visible"}
              className={"oui-text-2xs oui-ml-1"}
            >
              Keep visible
            </label>
          </Flex>
        </>
      )}
    </div>
  );
};
