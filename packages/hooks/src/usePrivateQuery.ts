import useSWR, { SWRResponse } from "swr";
import { signatureMiddleware } from "./middleware/signatureMiddleware";
import { fetcher, useQueryOptions } from "./utils/fetcher";
import { useAccount } from "./useAccount";
import { AccountStatusEnum } from "@orderly.network/types";

/**
 * usePrivateQuery
 * @description for private api
 * @param query
 * @param options
 */
export const usePrivateQuery = <T>(
  query: string,
  options?: useQueryOptions<T>
): SWRResponse<T> => {
  const { formatter, ...swrOptions } = options || {};
  const account = useAccount();
  const middleware = Array.isArray(options?.use) ? options?.use ?? [] : [];

  // @ts-ignore
  return useSWR<T>(
    () =>
      account.state.status >= AccountStatusEnum.EnableTrading
        ? [query, account.state.accountId]
        : null,
    (url: string, init: RequestInit) => {
      return fetcher(url, init, { formatter });
    },
    {
      ...swrOptions,
      use: [signatureMiddleware, ...middleware],
      onError: (err) => {},
    }
  );
};
