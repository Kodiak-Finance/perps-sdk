import { ListBox } from "./listBox";
import { FC, useMemo } from "react";
import { OrderBookCellType } from "./types";
export interface Props {
  data: number[][];
}
export const Asks: FC<Props> = (props) => {
  const { data } = props;
  const countQty = useMemo(() => {
    let max = Number.NaN;
    let len = data.length;
    let index = 0;

    while (Number.isNaN(max) && index < len) {
      max = data[index][2];
      index++;
    }

    return max;
  }, [data]);
  return (
    <ListBox type={OrderBookCellType.ASK} data={data} countQty={countQty} />
  );
};
