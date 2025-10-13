import { useMemo } from "react";
import {
  useAccount,
  useAssetsHistory,
  useCollateral,
} from "@kodiak-finance/orderly-hooks";
import { useAppContext } from "@kodiak-finance/orderly-react-app";
import {
  AccountStatusEnum,
  AssetHistorySideEnum,
  AssetHistoryStatusEnum,
} from "@kodiak-finance/orderly-types";

export const useFirstTimeDeposit = () => {
  const { state } = useAccount();
  const { wrongNetwork, disabledConnect } = useAppContext();
  const { totalValue } = useCollateral({
    dp: 2,
  });

  const unavailable =
    wrongNetwork ||
    disabledConnect ||
    (state.status < AccountStatusEnum.EnableTrading &&
      state.status !== AccountStatusEnum.EnableTradingWithoutConnected);

  const { startTime, endTime } = useMemo(() => {
    const d = new Date();
    // must set last second of today, when wallet ws changed, it will get latest data from api
    const today = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      23,
      59,
      59,
    );

    const endTime = today.getTime();
    // 90 days ago timestamp
    const startTime = endTime - 90 * 24 * 60 * 60 * 1000;

    return {
      startTime,
      endTime,
    };
  }, []);

  const [_, { meta }] = useAssetsHistory(
    {
      startTime,
      endTime,
      page: 1,
      pageSize: 5,
      side: AssetHistorySideEnum.DEPOSIT,
      status: AssetHistoryStatusEnum.COMPLETED,
    },
    {
      shouldUpdateOnWalletChanged: (data) =>
        data.side === AssetHistorySideEnum.DEPOSIT &&
        data.transStatus === AssetHistoryStatusEnum.COMPLETED,
    },
  );

  return !unavailable && totalValue === 0 && meta?.total === 0;
};
