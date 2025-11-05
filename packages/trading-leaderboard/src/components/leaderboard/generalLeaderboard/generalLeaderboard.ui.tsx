import { FC, useMemo } from "react";
import { cn, Box, useScreen, Divider } from "@kodiak-finance/orderly-ui";
import { LeaderboardTab } from "../../../type";
import { GeneralRankingWidget } from "../../ranking/generalRanking";
import { RankingColumnFields } from "../../ranking/shared/column";
import { LeaderboardFilter } from "../shared/LeaderboardFilter";
import { LeaderboardTabs } from "../shared/LeaderboardTabs";
import { GeneralLeaderboardScriptReturn } from "./generalLeaderboard.script";

export type GeneralLeaderboardProps = {
  style?: React.CSSProperties;
  className?: string;
  campaignDateRange?: {
    start_time: Date | string;
    end_time: Date | string;
  };
  pointsEndpoint?: string;
  timeRange?: {
    from?: string | Date;
    to?: string | Date | "now";
  };
} & GeneralLeaderboardScriptReturn;

export const GeneralLeaderboard: FC<GeneralLeaderboardProps> = (props) => {
  const { isMobile } = useScreen();

  const fields = useMemo<RankingColumnFields[]>(() => {
    if (isMobile) {
      if (props.activeTab === LeaderboardTab.Points) {
        return ["rank", "address", "points"];
      }
      return [
        "rank",
        "address",
        props.activeTab === LeaderboardTab.Volume ? "volume" : "pnl",
      ];
    }
    const baseFields: RankingColumnFields[] = [
      "rank",
      "address",
      "volume",
      "pnl",
    ];
    if (props.pointsEndpoint) {
      baseFields.push("points");
    }
    return baseFields;
  }, [isMobile, props.activeTab, props.pointsEndpoint]);

  if (isMobile) {
    return (
      <Box
        pt={2}
        px={3}
        r="2xl"
        intensity={900}
        width="100%"
        className={cn(
          "oui-trading-leaderboard-general-leaderboard oui-relative",
          props.className,
        )}
        style={props.style}
      >
        <LeaderboardFilter {...props} />
        <LeaderboardTabs
          isMobile={isMobile}
          className="oui-pt-0"
          activeTab={props.activeTab}
          onTabChange={props.onTabChange}
          pointsEndpoint={props.pointsEndpoint}
        />

        <GeneralRankingWidget
          dateRange={props.dateRange}
          address={props.searchValue}
          sortKey={
            props.activeTab === LeaderboardTab.Volume
              ? "perp_volume"
              : "realized_pnl"
          }
          fields={fields}
          pointsEndpoint={props.pointsEndpoint}
        />
      </Box>
    );
  }

  return (
    <Box
      pt={2}
      px={6}
      r="2xl"
      intensity={900}
      className={cn(
        "oui-trading-leaderboard-general-leaderboard oui-relative",
        "oui-mx-auto oui-max-w-[992px]",
        props.className,
      )}
      style={props.style}
    >
      <LeaderboardFilter {...props} />
      <Divider intensity={8} />

      <GeneralRankingWidget
        dateRange={props.dateRange}
        address={props.searchValue}
        fields={fields}
        pointsEndpoint={props.pointsEndpoint}
      />
    </Box>
  );
};
