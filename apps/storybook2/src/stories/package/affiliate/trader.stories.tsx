import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard, ReferralProvider } from "@orderly.network/affiliate";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";
import { CustomConfigStore } from "../../../components/configStore/customConfigStore";
import { TradingRewardsLayoutWidget } from "@orderly.network/trading-rewards";

const meta: Meta<typeof Dashboard.TraderPage> = {
  title: "Package/Affiliate/Trader",
  component: Dashboard.TraderPage,
  // subcomponents: {
  //     Assets: OverviewModule.AssetWidget,
  //     DepositsAndWithdrawWidget: OverviewModule.AssetHistoryWidget,
  // },
  decorators: [
    (Story: any) => {
      // const networkId = localStorage.getItem("preview-orderly-networkId");
      // const networkId = "mainnet";
      const networkId = "testnet";
      const configStore = new CustomConfigStore({
        networkId,
        brokerId: "orderly",
        brokerName: "Orderly",
        env: "qa",
      });
      return (
        <WalletConnectorProvider>
          <OrderlyAppProvider networkId={networkId} configStore={configStore}>
            <ReferralProvider
              becomeAnAffiliateUrl="https://orderly.network"
              learnAffiliateUrl="https://orderly.network"
              referralLinkUrl="https://ordely.network"
              showReferralPage={() => {
                console.log("show referral page");
              }}
              // onEnterAffiliatePage={() => {
              //     console.log("show affiliate page");
              // }}

              // onEnterTraderPage={() => {
              //     console.log("show trader page");

              // }}
              // chartConfig={
              //   {
              //     trader: {
              //       bar: { ...InitialBarStyle, fill: "#00B49E", columnPadding: 20 }
              //     },
              //     affiliate: {
              //       bar: { ...InitialBarStyle, fill: "#608CFF", columnPadding: 20 }
              //     },
              //   }
              // }
              // intl={
              // {
              // messages,
              // }
              // }
              splashPage={() => (
                <div style={{ backgroundColor: "#FF0000" }}>df</div>
              )}
              overwrite={{
                shortBrokerName: "Mark",
                brokerName: "Mark Pan",
                ref: {
                  // gradientTitle: "Mark",
                  // top: (state) =>  (<div>ASD</div>),
                  // card: (state) => (<div>GFHJK</div>)
                  // card: {
                  // refClassName: "orderly-text-red-900",
                  // refIcon: (<div className="orderly-bg-white orderly-h-full">DDS</div>),
                  // ref: (state) => (<div>gdjsj</div>)
                  // traderClassName: "orderly-text-red-900",
                  // traderIcon: (<div className="orderly-bg-white orderly-h-full">DDS</div>),
                  // trader: (state) => (<div>gdjsj</div>)
                  // },
                  // step: (state) => (<div>DJD</div>)
                  // step: {
                  //   applyIcon: (<div>Apply</div>),
                  //   shareIcon: (<div>Share</div>),
                  //   earnIcon: (<div>Earn</div>),
                  // }
                },
              }}
            >
              <Story />
            </ReferralProvider>
          </OrderlyAppProvider>
        </WalletConnectorProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //   backgroundColor: { control: 'color' },
    // p: {
    //     control: {
    //         type: "number",
    //         min: 0,
    //         max: 10,
    //         step: 1,
    //     },
    // },
  },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    p: 5,
    // py: 2,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};

export const LayoutPage: Story = {
  render: () => {
    return (
      <TradingRewardsLayoutWidget>
        <Dashboard.TraderPage />
      </TradingRewardsLayoutWidget>
    );
  },
};
