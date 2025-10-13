import { MarketsType, useMarkets } from "@kodiak-finance/orderly-hooks";
import {
  FavoritesDropdownMenuWidget,
  FavoritesTabWidget,
} from "@kodiak-finance/orderly-markets";
import { Box, Button, Flex } from "@kodiak-finance/orderly-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FavoritesDropdownMenuWidget> = {
  title: "Package/markets/Favorites",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
  (Story: any) => (
    <Box width={500}>
      <Story />
    </Box>
  ),
];

export const DropdownMenu: Story = {
  render: (args) => {
    const [data, favorite] = useMarkets(MarketsType.ALL);

    return (
      <FavoritesDropdownMenuWidget
        row={{ symbol: "PERP_BTC_USDC" }}
        favorite={favorite}
      >
        <Button>Show favorite dropdown menu</Button>
      </FavoritesDropdownMenuWidget>
    );
  },

  decorators,
};

export const Tabs: Story = {
  render: (args) => {
    const [data, favorite] = useMarkets(MarketsType.ALL);

    return (
      <>
        <Flex direction="column" itemAlign="start" gapY={2} p={2}>
          <div>Small</div>
          <Box width={400} intensity={900} p={3}>
            <FavoritesTabWidget favorite={favorite} size="sm" />
          </Box>

          <div>Default</div>
          <Box width={600} intensity={900} p={3}>
            <FavoritesTabWidget favorite={favorite} />
          </Box>
        </Flex>
      </>
    );
  },

  decorators,
};
