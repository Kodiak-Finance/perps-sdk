import { Grid } from "@orderly.network/ui";
import { PerformanceWidget } from "./performance";
import { AssetsChartWidget } from "./assetChart/assetsChart.widget";
import { AssetWidget } from "./assets";
import { HistoryDataGroupWidget } from "./historyDataGroup";
import { OverviewContextProvider } from "./providers/overviewCtx";

export const OverviewPage = () => {
  return (
    <OverviewContextProvider>
      <Grid cols={2} gap={4}>
        <AssetWidget />
        <AssetsChartWidget />
        <Grid.span colSpan={2}>
          <PerformanceWidget />
        </Grid.span>
        <Grid.span colSpan={2}>
          <HistoryDataGroupWidget />
        </Grid.span>
      </Grid>
    </OverviewContextProvider>
  );
};
