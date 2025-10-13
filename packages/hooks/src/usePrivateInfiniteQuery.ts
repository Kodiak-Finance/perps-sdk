import useSWRInfinite, {
  type SWRInfiniteKeyLoader,
  type SWRInfiniteConfiguration,
} from "swr/infinite";
import { get } from "@kodiak-finance/orderly-net";
import { AccountStatusEnum } from "@kodiak-finance/orderly-types";
import { signatureMiddleware } from "./middleware/signatureMiddleware";
import { useAccount } from "./useAccount";

export const usePrivateInfiniteQuery = <T>(
  getKey: SWRInfiniteKeyLoader | null,
  options?: SWRInfiniteConfiguration & {
    formatter?: (data: any) => any;
  },
) => {
  const { formatter, ...restOptions } = options || {};
  const { state } = useAccount();

  const middleware = Array.isArray(restOptions?.use)
    ? (restOptions?.use ?? [])
    : [];

  const result = useSWRInfinite<T>(
    (pageIndex: number, previousPageData) => {
      if (!getKey) return null;

      const queryKey = getKey(pageIndex, previousPageData);
      if (
        queryKey &&
        (state.status >= AccountStatusEnum.EnableTrading ||
          state.status === AccountStatusEnum.EnableTradingWithoutConnected)
      ) {
        return [queryKey, state.accountId];
      }

      return null;
    },
    (url: string, init: RequestInit) => {
      return restOptions.fetcher?.(url, init) || get(url, init, formatter);
    },
    {
      ...restOptions,
      use: [signatureMiddleware, ...middleware],
    },
  );

  return result;
};
