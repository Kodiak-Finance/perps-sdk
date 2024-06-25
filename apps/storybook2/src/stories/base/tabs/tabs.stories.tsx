import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  Box,
  Divider,
  ExclamationFillIcon,
  TabsBase,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs,
  TabPanel,
  ArrowLeftRightIcon,
  FeeTierIcon,
} from "@orderly.network/ui";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Base/Tabs",
  component: TabsBase,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <TabsBase defaultValue="account" className="oui-w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </TabsBase>
    );
  },
  args: {
    size: "sm",
  },
};

export const Icon: Story = {
  render: (args) => {
    return (
      <TabsBase defaultValue="account" className="oui-w-[400px]">
        <TabsList>
          <TabsTrigger value="account" icon={<ExclamationFillIcon />}>
            Account
          </TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <Divider />
        <Box p={2}>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Box>
      </TabsBase>
    );
  },
};

export const Simple: Story = {
  render: (args) => {
    return (
      <Tabs defaultValue="account">
        <TabPanel
          value="account"
          title="Deposits & Withdrawals"
          icon={<ArrowLeftRightIcon />}
        >
          Deposits & Withdrawals
        </TabPanel>
        <TabPanel value="password" title="Funding" icon={<FeeTierIcon />}>
          Funding
        </TabPanel>
        <TabPanel value="destribution" title="Distribution">
          Distribution
        </TabPanel>
      </Tabs>
    );
  },
};
