import { FC, ReactNode, useMemo } from "react";
import {
  Box,
  Button,
  Column,
  DataTable,
  Divider,
  Flex,
  ListView,
  Statistic,
  Text,
  cn,
} from "@orderly.network/ui";
import { ReferralCodesReturns, ReferralCodeType } from "./referralCodes.script";
import { PinBtn } from "../../../components/pinButton";
import { useMediaQuery } from "@orderly.network/hooks";
import { Decimal } from "@orderly.network/utils";
import { EditIcon } from "../../../components/editIcon";

export const ReferralCodes: FC<ReferralCodesReturns> = (props) => {
  const isTablet = useMediaQuery("(max-width: 767px)");
  return (
    <Flex
      r={"2xl"}
      p={6}
      width={"100%"}
      gap={4}
      direction={"column"}
      className="oui-bg-base-9 oui-tabular-nums oui-p-6 oui-h-full"
    >
      <Title {...props} />

      <div className="oui-w-full oui-flex oui-flex-col 2xl:oui-h-full">
        <Divider />
        {isTablet ? <MobileLayout {...props} /> : <DesktopLayout {...props} />}
      </div>
    </Flex>
  );
};

const Title: FC<ReferralCodesReturns> = (props) => {
  return (
    <Flex direction={"row"} justify={"between"} width={"100%"}>
      <Text className="oui-text-lg">Referral codes</Text>
      <div className="oui-text-2xs md:oui-text-xs xl:oui-text-sm">
        <Text className="oui-text-base-contrast-54">
          Remaining referral codes:&nbsp;
        </Text>
        <Text className="oui-text-primary-light">
          {props.codes?.length || "--"}
        </Text>
      </div>
    </Flex>
  );
};

const MobileLayout: FC<ReferralCodesReturns> = (props) => {
  return (
    <ListView
      dataSource={props.codes}
      className="oui-max-h-[240px] oui-w-full"
      renderItem={(e, index) => {
        return (
          <Flex direction={"column"}>
            <MobileCell
              key={index}
              data={e}
              editRate={props.editRate}
              copyLink={props.copyLink}
              copyCode={props.copyCode}
              setPinCode={props.setPinCode}
            />
            <Divider className="oui-w-full oui-mt-3" />
          </Flex>
        );
      }}
    />
  );
};

const MobileCellItem: FC<{
  // key: string;
  title: string;
  value: string | ReactNode;
  copyable?: boolean;
  align?: "start" | "end" | undefined;
  className?: string;
  editRate?: () => void;
  onCopy?: () => void;
}> = (props) => {
  const { title, copyable, value, align, className, editRate, onCopy } = props;
  return (
    <Statistic
      id="oui-affiliate-affiliate-referralCodes"
      className={cn("oui-flex-1", className)}
      label={
        <Text className="oui-text-base-contrast-36 oui-text-2xs">{title}</Text>
      }
      align={align}
      children={
        <Flex direction={"row"} gap={1}>
          <Text.formatted
            copyable={copyable}
            onCopy={() => {
              onCopy?.();
            }}
            className="oui-text-base-contrast-80 oui-text-sm oui-mt-[6px]"
          >
            {value as string}
          </Text.formatted>
          {editRate && (
            <EditIcon
              className=" oui-fill-white/[.36] hover:oui-fill-white/80 oui-cursor-pointer oui-mt-[1px]"
              fillOpacity={1}
              fill="currentColor"
              onClick={(e) => editRate()}
            />
          )}
        </Flex>
      }
    />
  );
};
const MobileCell: FC<{
  data: ReferralCodeType;
  setPinCode: (code: string, del?: boolean) => void;
  copyLink: (code: string) => void;
  copyCode: (code: string) => void;
  editRate: (code: ReferralCodeType) => void;
}> = (props) => {
  const { data, setPinCode, copyLink, copyCode, editRate } = props;

  return (
    <Flex key={data.code} gap={3} direction={"column"} className="oui-w-full">
      <Flex
        direction={"row"}
        justify={"between"}
        itemAlign={"stretch"}
        width={"100%"}
      >
        <MobileCellItem
          title="Referral code"
          value={data.code}
          copyable
          onCopy={() => {
            props.copyCode?.(data.code);
          }}
        />
        <MobileCellItem
          title="You / Referee"
          value={getRate(data)}
          align="end"
          editRate={() => {
            editRate(data);
          }}
        />
        <MobileCellItem
          title="Referees / Traders"
          value={getCount(data)}
          align="end"
          className={"oui-hidden md:oui-flex"}
        />
      </Flex>
      <Flex
        direction={"row"}
        justify={"between"}
        itemAlign={"stretch"}
        width={"100%"}
        className="md:oui-hidden"
      >
        <MobileCellItem
          title="Referees"
          value={getCount(data).split("/")?.[0]}
          align="start"
        />
        <MobileCellItem
          title="Traders"
          value={getCount(data).split("/")?.[1]}
          align="end"
        />
      </Flex>
      <Flex
        direction={"row"}
        justify={"between"}
        itemAlign={"stretch"}
        width={"100%"}
      >
        <PinBtn
          pinned={data.isPined || false}
          onClick={(e) => {
            setPinCode(data.code, !e);
          }}
        />
        <Button
          variant="outlined"
          size="xs"
          className="oui-px-[20px]"
          onClick={(e) => {
            copyLink(data.code);
          }}
        >
          Copy link
        </Button>
      </Flex>
    </Flex>
  );
};

const DesktopLayout: FC<ReferralCodesReturns> = (props) => {
  const moreColumn = useMediaQuery("(min-width: 1024px)");

  const columns = useMemo(() => {
    const cols: Column[] = [
      {
        title: "Referral Codes",
        dataIndex: "code",
        width: moreColumn ? 115 : 120,
        className: "!oui-px-0",
        render: (value, data) => {
          return (
            <Flex direction={"row"} itemAlign={"center"} gap={1}>
              <PinBtn
                size={14}
                pinned={data.isPined || false}
                onClick={(e) => {
                  props.setPinCode(data.code, !e);
                }}
              />
              <Text.formatted
                // rule={""}
                copyable
                onCopy={() => {
                  props.copyCode?.(data.code);
                }}
              >
                {value}
              </Text.formatted>
            </Flex>
          );
        },
      },
      {
        title: "You / Referee",
        dataIndex: "dffd",
        width: moreColumn ? 120 : 120,
        className: "oui-pr-0",
        render: (value, data) => {
          return (
            <Flex direction={"row"} itemAlign={"center"} gap={1}>
              {getRate(data)}
              <EditIcon
                className=" oui-fill-white/[.36] hover:oui-fill-white/80 oui-cursor-pointer oui-mt-[1px]"
                fillOpacity={1}
                fill="currentColor"
                onClick={(e) => props.editRate?.(data)}
              />
            </Flex>
          );
        },
      },
    ];

    if (moreColumn) {
      cols.push({
        title: "Referees",
        dataIndex: "referee_rebate_rate",
        width: 70,
        className: "oui-pr-0",
        render: (value, data) => getCount(data).split("/")[0],
      });
      cols.push({
        title: "Traders",
        dataIndex: "referrer_rebate_rate",
        width: 70,
        className: "oui-pr-0",
        render: (value, data) => getCount(data).split("/")[1],
      });
    } else {
      cols.push({
        title: "Referees / Traders ",
        dataIndex: "total_invites/total_traded",
        width: 120,
        fixed: "left",
        render: (value, data) => getCount(data),
      });
    }

    cols.push({
      title: "",
      dataIndex: "",
      align: "right",
      width: 74,
      className: "!oui-px-0",
      render: (value, data) => (
        <Button
          variant="outlined"
          size="sm"
          className="oui-px-5"
          onClick={(e) => {
            props?.copyLink?.(data.code);
          }}
        >
          Copy link
        </Button>
      ),
    });

    console.log("cols", cols);

    return cols;
  }, [moreColumn]);

  console.log("codes", props.codes);

  return (
    <DataTable
      bordered
      columns={columns}
      dataSource={props.codes}
      scroll={{ y: 200 }}
      classNames={{
        header: "oui-text-xs oui-text-base-contrast-36 oui-bg-base-9 oui-px-0",
        body: "oui-text-xs oui-text-base-contrast-80",
        root: "2xl:oui-flex-1 2xl:oui-max-h-[230px] 3xl:oui-max-h-[300px]"
      }}
    />
  );
};

const getRate = (item: ReferralCodeType) => {
  const refereeRate = new Decimal(item.referee_rebate_rate)
    .mul(100)
    .toFixed(1, Decimal.ROUND_DOWN)
    .toString();
  const referralRate = new Decimal(item.referrer_rebate_rate)
    .mul(100)
    .toFixed(1, Decimal.ROUND_DOWN)
    .toString();
  return `${referralRate}% / ${refereeRate}%`;
};

const getCount = (item: ReferralCodeType) => {
  return `${item.total_invites} / ${item.total_traded}`;
};
