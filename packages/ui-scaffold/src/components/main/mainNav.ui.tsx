import { FC, PropsWithChildren, useMemo } from "react";
import {
  MainNavClassNames,
  MainNavItems,
  MainNavItemsProps,
} from "./mainNavItems";

import { ProductsMenu, ProductsProps } from "./products";
import { Flex, Logo } from "@orderly.network/ui";
import type { LogoProps } from "@orderly.network/ui";
import { AccountMenuWidget } from "../accountMenu";
import { AccountSummaryWidget } from "../accountSummary";
import { ChainMenuWidget } from "../chainMenu";
import type { MainNavItem } from "./navItem";
import { CampaignPositionEnum } from "./useWidgetBuilder.script";
import { CampaignButton, CampaignProps } from "./campaignButton";

// export type CampaignPosition = "menuLeading" | "menuTailing" | "navTailing";

export type MainNavProps = {
  className?: string;
  logo: LogoProps;
  products: ProductsProps;
  mainMenus: MainNavItemsProps;
  wrongNetwork: boolean;
  isConnected: boolean;
  campaigns?: CampaignProps;
  campaignPosition?: CampaignPositionEnum;
  classNames?: {
    root?: string;
    mainNav?: MainNavClassNames;
    // subNav?: string;
    logo?: string;
    products?: string;
    account?: string;
    chains?: string;
    campaignButton?: string;
  };
};

export const MainNav: FC<PropsWithChildren<MainNavProps>> = (props) => {
  const { className, logo, products, classNames, campaigns, campaignPosition } =
    props;

  const children = useMemo(() => {
    if (typeof props.children === "undefined") return null;

    return <Flex grow>{props.children}</Flex>;
  }, [props.children]);

  return (
    <Flex
      as="header"
      itemAlign={"center"}
      height={"48px"}
      justify={"between"}
      px={3}
      className={`orderly-main-nav ${className} ${classNames?.root} oui-font-semibold`}
    >
      <Flex itemAlign={"center"} gap={4}>
        <Logo {...logo} />
        <ProductsMenu {...products} className={classNames?.products} />
        <MainNavItems {...props.mainMenus} classNames={classNames?.mainNav} />
      </Flex>
      {children}

      <Flex itemAlign={"center"} gap={4}>
        {campaignPosition === CampaignPositionEnum.navTailing && campaigns ? (
          <CampaignButton
            {...campaigns}
            className={classNames?.campaignButton}
          />
        ) : null}
        <AccountSummaryWidget />
        <ChainMenuWidget />
        {props.wrongNetwork && props.isConnected ? null : <AccountMenuWidget />}
      </Flex>
    </Flex>
  );
};

MainNav.displayName = "MainNav";
