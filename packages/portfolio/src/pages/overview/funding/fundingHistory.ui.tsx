import { DataTable, Filter, Pagination } from "@orderly.network/ui";
import { useFundingHistoryColumns } from "./column";
import { FC } from "react";
import { useSymbolsInfo } from "@orderly.network/hooks";
import { type UseFundingHistoryReturn } from "./useDataSource.script";
import { AuthGuardDataTable } from "@orderly.network/ui-connector";

type FundingHistoryProps = {} & UseFundingHistoryReturn;

export const FundingHistoryUI: FC<FundingHistoryProps> = (props) => {
  const {
    dataSource,
    queryParameter,
    onFilter,
    isLoading,
    meta,
    setPage,
    setPageSize,
  } = props;
  const columns = useFundingHistoryColumns();
  const symbols = useSymbolsInfo();

  const { symbol, dateRange } = queryParameter;

  return (
    <AuthGuardDataTable
      bordered
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      generatedRowKey={(record) => `${record.updated_time}`}
      classNames={{
        header: "oui-text-base-contrast-36",
        body: "oui-text-base-contrast-80",
      }}
    >
      <Filter
        items={[
          {
            type: "select",
            name: "symbol",
            isCombine: true,
            options: [
              {
                label: "All",
                value: "All",
              },
              ...Object.keys(symbols).map((symbol) => {
                // const s = transSymbolformString(symbol);
                return {
                  label: symbol,
                  value: symbol,
                };
              }),
            ],
            value: symbol,
          },
          {
            type: "range",
            name: "dateRange",
            value: {
              from: dateRange[0],
              to: dateRange[1],
            },
          },
        ]}
        onFilter={(value) => {
          onFilter(value);
        }}
      />
      <Pagination
        {...meta}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </AuthGuardDataTable>
  );
};
