import type { RestrictedInfoOptions } from "@kodiak-finance/orderly-hooks";
import type { AppLogos } from "@kodiak-finance/orderly-react-app";
import type { API } from "@kodiak-finance/orderly-types";
import { AnnouncementType } from "@kodiak-finance/orderly-types";

export type OrderlyAppProviderConfigProps = {
  appIcons: AppLogos;
  restrictedInfo: RestrictedInfoOptions;
  customAnnouncements?: API.AnnouncementRow[];
};

export const orderlyAppProviderConfig: OrderlyAppProviderConfigProps = {
  appIcons: {
    main: {
      component: (
        <img
          alt="orderlylogo"
          src="/orderly-logo.svg"
          style={{ width: 100, height: 40 }}
        />
      ),
    },
    secondary: {
      img: "/orderly-logo-secondary.svg",
    },
  },
  restrictedInfo: {
    enableDefault: true,
    customRestrictedIps: [],
    customRestrictedRegions: [],
    customUnblockRegions: ["United States"],
    // content: ({ ip, brokerName }) =>
    //   `You are accessing ${brokerName} from an IP address (${ip}) associated with a restricted country. Please refer to our Terms of Use</0>. If you believe this is an error, contact x@orerly.network.`,
  },
  customAnnouncements: [
    {
      announcement_id: "custom-1",
      message: "Custom Test Announcement #1: This is passed as a param",
      type: AnnouncementType.Campaign,
      updated_time: Date.now(),
    },
    {
      announcement_id: "custom-2",
      message: "Custom Test Announcement #2: Merged with API announcements",
      type: AnnouncementType.Campaign,
      updated_time: Date.now(),
    },
  ],
};
