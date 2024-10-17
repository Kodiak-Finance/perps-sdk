import { PositionsProps } from "@orderly.network/ui-positions";
import { DataListTabType, useDataListScript } from "./dataList.script";
import { DataList } from "./dataList.ui";
import { SharePnLConfig, SharePnLParams } from "@orderly.network/ui-share";


export const DataListWidget = (
  props: {
    current?: DataListTabType;
    tabletMediaQuery: string;
    symbol?: string;
    sharePnLConfig?: SharePnLConfig &
    Partial<Omit<SharePnLParams, "position" | "refCode" | "leverage">>;
  } 
) => {
  const state = useDataListScript({
    ...props,
  });
  return <DataList {...state} />;
};
