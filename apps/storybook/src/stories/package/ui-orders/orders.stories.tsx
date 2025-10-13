import { PortfolioLayoutWidget } from "@kodiak-finance/orderly-portfolio";
import { Divider, Flex, Text } from "@kodiak-finance/orderly-ui";
import { OrdersWidget, TabType } from "@kodiak-finance/orderly-ui-orders";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof OrdersWidget> = {
  title: "Package/ui-orders/Orders",
  component: OrdersWidget,
  parameters: {
    // layout: "centered",
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {
  render: (arg) => {
    return <OrdersWidget current={TabType.pending} />;
  },
};

export const Layout: Story = {
  render: (arg) => {
    return (
      <PortfolioLayoutWidget>
        <Flex
          p={6}
          direction={"column"}
          gap={4}
          width={"100"}
          height={"100%"}
          itemAlign={"start"}
          r="2xl"
          className="oui-bg-base-9 oui-font-semibold"
        >
          <Text size="lg">Orders</Text>
          <Divider className="oui-w-full" />
          <OrdersWidget current={TabType.rejected} />
        </Flex>
      </PortfolioLayoutWidget>
    );
  },
};
