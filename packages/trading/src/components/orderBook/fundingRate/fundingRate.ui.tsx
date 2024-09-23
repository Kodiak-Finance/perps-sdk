import { FC } from "react";
import { Flex, Text } from "@orderly.network/ui";
import { FundingRateState } from "./fundingRate.script";

export const FundingRate: FC<FundingRateState> = (props) => {
  const predFundingRate = props.data.est_funding_rate;
  const countDown = props.data.countDown;

  return (
    <Flex direction={"column"} itemAlign={"start"} pb={2}>
      <Text intensity={36} size="2xs">
        Pred. funding rate
      </Text>

      {predFundingRate === null ? (
        "--"
      ) : (
        <div className="orderly-flex orderly-gap-1 oui-text-2xs">
          <span className="orderly-text-warning">{`${predFundingRate}%`}</span>
          <span>in</span>
          <span>{countDown}</span>
        </div>
      )}
    </Flex>
  );
};
