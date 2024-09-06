import {
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  Flex,
  Text,
  Slider,
  Button,
  inputFormatter,
} from "@orderly.network/ui";
import { Input } from "@orderly.network/ui";
import { useEffect, useState } from "react";
import { usePositionsRowContext } from "./positionRowContext";
import { Decimal } from "@orderly.network/utils";
import { OrderType } from "@orderly.network/types";

export const QuantityInput = (props: { value: number }) => {
  // const [quantity, setQuantity] = useState(`${props.value}`);
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState<number>(100);
  const {
    baseDp,
    quoteDp,
    updateQuantity: setQuantity,
    quantity,
    type,
  } = usePositionsRowContext();

  useEffect(() => {
    // when click the outside of the popover, close the popover
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-popover-root]")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const resetQuantity = (percent: number) => {
    setQuantity(`${props.value * (percent / 100)}`);
  };

  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Input
          size="sm"
          onFocus={() => {
            setOpen(true);
          }}
          formatters={[
            inputFormatter.numberFormatter,
            ...(baseDp ? [inputFormatter.dpFormatter(baseDp)] : []),
          ]}
          value={quantity}
          onValueChange={(e) => {
            setQuantity(e);
            if (type === OrderType.LIMIT) {
              const value = new Decimal(e)
                .div(props.value)
                .mul(100)
                .abs()
                .toFixed(0, Decimal.ROUND_DOWN);
                console.log("xxxxxx value", value);
                
              setSliderValue(Math.min(100, Number(value)));
            }
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        className="oui-w-[360px] oui-rounded-xl"
        align="start"
        side="bottom"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <Flex p={1} gap={2} width={"100%"} itemAlign={"start"}>
          <Text size="xs" intensity={98} className="oui-min-w-[30px]">
            {`${sliderValue}%`}
          </Text>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Slider
              markCount={4}
              value={[sliderValue]}
              onValueChange={(e) => {
                const values = Array.from(e.values());
                setSliderValue(values[0]);
                resetQuantity(values[0]);
              }}
            />
            <Buttons
              onClick={(value) => {
                setSliderValue(value * 100);
                resetQuantity(value * 100);
              }}
            />
          </Flex>
        </Flex>
      </PopoverContent>
    </PopoverRoot>
  );
};

const Buttons = (props: { onClick: (value: number) => void }) => {
  const list = [
    {
      label: "0%",
      value: 0,
    },
    {
      label: "25%",
      value: 0.25,
    },
    {
      label: "50%",
      value: 0.5,
    },
    {
      label: "75%",
      value: 0.75,
    },
    {
      label: "Max",
      value: 1,
    },
  ];

  return (
    <Flex gap={2} width={"100%"}>
      {list.map((item, index) => {
        return (
          <Button
            key={index}
            variant="outlined"
            color="secondary"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick(item.value);
            }}
            className="oui-w-1/5"
          >
            {item.label}
          </Button>
        );
      })}
    </Flex>
  );
};
