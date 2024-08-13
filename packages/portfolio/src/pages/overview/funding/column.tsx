import { useMemo } from "react";

import { Flex, type Column, Text } from "@orderly.network/ui";
import { API } from "@orderly.network/types";

export const useFundingHistoryColumns = () => {
  const columns = useMemo<
    Column<API.FundingFeeRow & { annual_rate: number }>[]
  >(() => {
    return [
      {
        title: "Instrument",
        dataIndex: "symbol",
        width: 80,
        rule: "symbol",
        textProps: {
          showIcon: true,
        },
      },
      {
        title: "Time",
        dataIndex: "created_time",
        width: 120,
        rule: "date",
      },
      {
        title: "Funding rate / Annual rate",
        dataIndex: "funding_rate",
        width: 80,
        render: (value: any, record) => {
          return (
            <Flex gap={1}>
              {/* <span>{`${record.funding_rate * 100}%`}</span> */}
              <Text.numeral rule={"percentages"} dp={6}>
                {record.funding_rate * -1}
              </Text.numeral>
              <span>/</span>
              {/* <span>{`${record.annual_rate * 10}%`}</span> */}
              <Text.numeral rule={"percentages"} dp={6}>
                {record.annual_rate * -1}
              </Text.numeral>
            </Flex>
          );
        },
      },
      {
        title: "Payment type",
        dataIndex: "payment_type",
        width: 80,
        render: (value: any) => {
          switch (value) {
            case "Pay":
              return "Paid";
            case "Receive":
              return "Received";
            default:
              return value;
          }
        },
      },
      {
        title: "Funding fee (USDC)",
        dataIndex: "funding_fee",
        width: 80,
        rule: "price",
        formatter(value, record, index) {
          return Number(value) * -1;
        },
        numeralProps: {
          coloring: true,
          showIdentifier: true,
          ignoreDP: true,
        },
      },
    ] as Column<API.FundingFeeRow & { annual_rate: number }>[];
  }, []);

  return columns;
};
