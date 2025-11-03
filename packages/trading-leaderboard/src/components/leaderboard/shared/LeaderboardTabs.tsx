import { FC, useEffect, useMemo } from "react";
import { useTranslation } from "@kodiak-finance/orderly-i18n";
import { cn, Flex, TabPanel, Tabs } from "@kodiak-finance/orderly-ui";
import { LeaderboardTab } from "../../../type";
import { formatUpdateDate } from "../../../utils";
import { useTradingLeaderboardContext } from "../../provider";

type LeaderboardTabsProps = {
  isMobile?: boolean;
  className?: string;
  activeTab: LeaderboardTab;
  onTabChange: (tab: LeaderboardTab) => void;
  pointsEndpoint?: string;
};

export const LeaderboardTabs: FC<LeaderboardTabsProps> = (props) => {
  const { t } = useTranslation();
  const { updatedTime, currentCampaign } = useTradingLeaderboardContext();

  const updateTime = useMemo(() => {
    if (updatedTime && currentCampaign) {
      return formatUpdateDate(updatedTime);
    }
    return "";
  }, [props.isMobile, updatedTime, currentCampaign]);

  const { showVolume, showPnl, showPoints } = useMemo(() => {
    const metrics = currentCampaign?.prize_pools?.map((item) => item.metric);
    const isMobileGeneral = props.isMobile && !currentCampaign;
    const showVolume = isMobileGeneral
      ? true
      : metrics?.includes(LeaderboardTab.Volume);
    const showPnl = isMobileGeneral
      ? true
      : metrics?.includes(LeaderboardTab.Pnl);
    const showPoints = !!props.pointsEndpoint;

    return {
      showVolume,
      showPnl,
      showPoints,
    };
  }, [currentCampaign, props.activeTab, props.isMobile, props.pointsEndpoint]);

  useEffect(() => {
    // set default tab
    if (showVolume && showPnl) {
      props.onTabChange(LeaderboardTab.Volume);
    } else if (showVolume) {
      props.onTabChange(LeaderboardTab.Volume);
    } else if (showPnl) {
      props.onTabChange(LeaderboardTab.Pnl);
    } else if (showPoints) {
      props.onTabChange(LeaderboardTab.Points);
    }
  }, [currentCampaign, showVolume, showPnl, showPoints]);

  const renderTabs = () => {
    const hasAnyTab = showVolume || showPnl || showPoints;

    if (!hasAnyTab) {
      return <div></div>;
    }

    return (
      <Tabs
        value={props.activeTab}
        onValueChange={props.onTabChange as (tab: string) => void}
        variant="contained"
        size="lg"
        key={currentCampaign?.campaign_id}
      >
        {showVolume && (
          <TabPanel
            title={t("tradingLeaderboard.tradingVolume")}
            value={LeaderboardTab.Volume}
          ></TabPanel>
        )}
        {showPnl && (
          <TabPanel
            title={t("common.realizedPnl")}
            value={LeaderboardTab.Pnl}
          ></TabPanel>
        )}
        {showPoints && (
          <TabPanel
            title={t("common.points")}
            value={LeaderboardTab.Points}
          ></TabPanel>
        )}
      </Tabs>
    );
  };

  return (
    <Flex
      width="100%"
      py={3}
      justify="between"
      className={cn(
        "oui-trading-leaderboard-ranking-tabs",
        "oui-border-b oui-border-line",
        props.className,
      )}
    >
      {renderTabs()}
      {/* <Tabs
        value={props.activeTab}
        onValueChange={props.onTabChange as (tab: string) => void}
        variant="contained"
        size="lg"
      >
        <TabPanel
          title="Trading volume"
          value={LeaderboardTab.Volume}
        ></TabPanel>
        <TabPanel title="Realized PnL" value={LeaderboardTab.Pnl}></TabPanel>
      </Tabs> */}
      {updateTime && (
        <Flex
          itemAlign="start"
          direction={props.isMobile ? "column" : "row"}
          gap={1}
          className={cn(
            props.isMobile ? "oui-text-3xs" : "oui-text-sm",
            "oui-text-base-contrast-36",
          )}
        >
          <span>{t("tradingLeaderboard.lastUpdate")}:</span>
          <span>{updateTime}</span>
        </Flex>
      )}
    </Flex>
  );
};
