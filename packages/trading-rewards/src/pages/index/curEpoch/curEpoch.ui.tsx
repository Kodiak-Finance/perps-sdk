import { Box, Button, Flex, Text, Tooltip, cn } from "@orderly.network/ui";

import { useState, useEffect, FC } from "react";
import { OrderlyIcon } from "../components/orderlyIcon";
import { CurEpochReturns } from "./curEpoch.script";
import { commify, commifyOptional } from "@orderly.network/utils";
import { AccountStatusEnum } from "@orderly.network/types";
import { AuthGuard } from "@orderly.network/ui-connector";
import { RewardsTooltip } from "./rewardsTooltip";

export const CurEpoch: FC<CurEpochReturns> = (props) => {
  const state = props;
  const curEpochInfo = state.epochList?.[1].curEpochInfo;
  const startTime = curEpochInfo?.start_time;
  const endTime = curEpochInfo?.end_time;
  const curEpochId = curEpochInfo?.epoch_id;
  const max_reward_amount = curEpochInfo?.max_reward_amount;
  const token = curEpochInfo?.epoch_token;
  return (
    <Flex
      id="oui-tradingRewards-home-currentEpoch"
      r={"2xl"}
      className="oui-bg-base-9 oui-font-semibold"
      width={"100%"}
      height={"100%"}
      direction={"column"}
      //   justify={"stretch"}
      itemAlign={"stretch"}
    >
      <Countdown targetTimestamp={endTime} />
      <Flex p={6} direction={"column"} gap={4} className="oui-h-full">
        <Flex direction={"row"} gap={3} width={"100%"} justify={"around"}>
          <Statics
            title="Epoch"
            highLight={curEpochId ? `${curEpochId}` : "--"}
            text={
              startTime && endTime
                ? `${getDate(startTime)} - ${getDate(endTime)}`
                : ""
            }
          />
          <Statics
            title="Epoch rewards"
            highLight={commifyOptional(max_reward_amount, { fix: 0 })}
            text={token}
          />
        </Flex>
        <EstRewards
          direction={state.notConnected ? "row" : "column"}
          justify={state.notConnected ? "between" : "center"}
          hideData={state.hideData}
          estRewards={state.hideData ? "--" : props.estimate?.est_r_wallet}
          rewardsTooltip={props.rewardsTooltip}
          background={
            state.notConnected
              ? "linear-gradient(28.29deg, #1B1D22 21.6%, #26292E 83.23%)"
              : "linear-gradient(0deg, #2D0061 2.62%, #BD6BED 86.5%)"
          }
        />
        {/* {state.notConnected && (
          <Button
            variant="gradient"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              state.connect();
            }}
          >
            Connect wallet
          </Button>
        )} */}

        <div className="oui-w-full">
          <AuthGuard
            status={AccountStatusEnum.SignedIn}
            buttonProps={{ fullWidth: true }}
          >
            <></>
          </AuthGuard>
        </div>
      </Flex>
    </Flex>
  );
};

const EstRewards: FC<{
  estRewards?: number | string;
  direction: "row" | "column";
  justify: "center" | "between";
  background: string;
  hideData: boolean;
  rewardsTooltip:
    | {
        brokerName: string | undefined;
        curRewards: number;
        otherRewards: number;
      }
    | undefined;
}> = (props) => {
  return (
    <Flex
      direction={props.direction}
      gap={2}
      py={4}
      px={6}
      width={"100%"}
      r="xl"
      itemAlign={"center"}
      justify={props.justify}
      style={{
        background: props.background,
      }}
      className="oui-flex-1 oui-h-full"
    >
      <Text className="oui-text-base xl:oui-text-lg oui-text-base-contrast-54">
        My est. rewards
      </Text>
      <Flex direction={"row"} gap={3}>
        <OrderlyIcon className="oui-w-5 oui-h-5 md:oui-w-6 md:oui-h-6 lg:oui-w-7 lg:oui-h-7 xl:oui-w-8 xl:oui-h-8" />
        <Text
          children={commifyOptional(props.estRewards, { fix: 2 })}
          className="oui-text-xl md:oui-text-2xl xl:oui-text-[32px]"
        />
        {props.rewardsTooltip && (
          <RewardsTooltip rewardsTooltip={props.rewardsTooltip} />
        )}
      </Flex>
    </Flex>
  );
};

const Statics: FC<{
  title: string;
  highLight?: string;
  text?: string;
}> = (props) => {
  const { title, highLight, text } = props;
  return (
    <Flex
      // px={1}
      py={2}
      justify={"between"}
      direction={"column"}
      className="flex-1"
      gap={2}
    >
      <Text
        className={cn(
          "oui-text-base-contrast-54",
          // font size
          "oui-text-xs md:oui-text-sm xl:oui-text-base",
          /// leading
          "oui-leading-[20px] xl:oui-leading-[24px]"
        )}
      >
        {title}
      </Text>
      <Flex direction={"row"} gap={1} itemAlign={"end"} justify={"center"}>
        <Text.gradient
          color="brand"
          angle={90}
          className="oui-text-base md:oui-text-lg lg:oui-text-xl xl:oui-text-2xl"
        >
          {highLight}
        </Text.gradient>
        <Text
          intensity={80}
          className="oui-text-2xs md:oui-text-xs xl:oui-text-sm oui-mb-[3px]"
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};

const Countdown: FC<{
  targetTimestamp?: number;
}> = ({ targetTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof targetTimestamp === "undefined") return;
      const now = new Date().getTime();
      const distance = targetTimestamp - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTimestamp]);

  const num = (value: string) => {
    return (
      <Text className="oui-text-base-contrast oui-text-sm md:oui-text-base lg:oui-text-lg ">
        {value}
      </Text>
    );
  };

  return (
    <Box
      className="oui-rounded-t-2xl oui-text-base-contrast-54 oui-font-semibold"
      gradient="neutral"
      angle={180}
      width={"full"}
    >
      <Flex justify={"center"} gap={1}>
        <span>Countdown:</span>
        <Flex
          direction={"row"}
          itemAlign={"end"}
          gap={1}
          className="oui-text-2xs md:oui-text-xs lg:oui-text-sm oui-py-[13px]"
        >
          {num(`${timeLeft.days}`.padStart(2, "0"))}
          <span>D</span>
          {num(`${timeLeft.hours}`.padStart(2, "0"))}
          <span>H</span>
          {num(`${timeLeft.minutes}`.padStart(2, "0"))}
          <span>M</span>
          {num(`${timeLeft.seconds}`.padStart(2, "0"))}
          <span>S</span>
        </Flex>
      </Flex>
    </Box>
  );
};

const getDate = (timestamp?: number): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  return `${month}. ${day}`;
};
