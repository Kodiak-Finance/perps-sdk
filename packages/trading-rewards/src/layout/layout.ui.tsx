import { Box, ExtensionPositionEnum, ExtensionSlot } from "@orderly.network/ui";
import { LayoutProvider } from "./context";
import {
  Scaffold,
  SideBar,
  SideBarProps,
  SideMenuItem,
  useScaffoldContext,
} from "@orderly.network/ui-scaffold";
import { PropsWithChildren } from "react";
import { LayoutProps } from "@orderly.network/ui-scaffold";

export type TradingRewardsLayoutProps = {
  hideSideBar?: boolean;
} & SideBarProps &
  LayoutProps;

export const TradingRewardsLayout = (
  props: PropsWithChildren<TradingRewardsLayoutProps>
) => {
  const { children, ...rest } = props;

  return (
    <Scaffold
      footerHeight={29}
      classNames={{
        content: "lg:oui-mb-0",
        topNavbar: "oui-bg-base-9",
        leftSidebar:
          "oui-m-3 oui-p-4 oui-broder oui-border-[1px] oui-border-line oui-rounded-xl oui-bg-base-9",
      }}
      leftSidebar={props.hideSideBar ? null : <LeftSidebar {...rest} />}
      routerAdapter={props.routerAdapter}
      {...props}
    >
      <Box className="oui-flex oui-justify-center">{props.children}</Box>
    </Scaffold>
  );
};
const LeftSidebar = (props: SideBarProps & LayoutProps) => {
  const { expanded, setExpand } = useScaffoldContext();

  return (
    <SideBar
      title={"Rewards"}
      {...props}
      open={expanded}
      onOpenChange={(open) => setExpand(open)}
      onItemSelect={(a) => {
        props.onItemSelect?.(a);
        props.routerAdapter?.onRouteChange?.({
          href: a.href || "",
          name: a.name,
        });
      }}
    />
  );
};
