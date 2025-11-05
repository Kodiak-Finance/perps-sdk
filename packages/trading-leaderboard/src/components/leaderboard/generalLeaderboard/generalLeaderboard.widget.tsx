import { FC } from "react";
import { useGeneralLeaderboardScript } from "./generalLeaderboard.script";
import {
  GeneralLeaderboard,
  GeneralLeaderboardProps,
} from "./generalLeaderboard.ui";

export type GeneralLeaderboardWidgetProps = Pick<
  GeneralLeaderboardProps,
  "style" | "className" | "campaignDateRange" | "pointsEndpoint" | "timeRange"
>;

export const GeneralLeaderboardWidget: FC<GeneralLeaderboardWidgetProps> = (
  props,
) => {
  const state = useGeneralLeaderboardScript({
    campaignDateRange: props.campaignDateRange,
    timeRange: props.timeRange,
  });

  return (
    <GeneralLeaderboard
      {...state}
      className={props.className}
      style={props.style}
      pointsEndpoint={props.pointsEndpoint}
      timeRange={props.timeRange}
    />
  );
};
