import { Calculator, CalculatorCtx, CalculatorScope } from "../../types";
import { BaseCalculator } from "./baseCalculator";
import { useMarkPriceStore } from "../useMarkPrice/useMarkPriceStore";

class MarkPriceCalculator extends BaseCalculator<any> {
  name: string = "markPriceCalculator";

  calc(scope: CalculatorScope, data: any, ctx: CalculatorCtx) {
    return data;
  }

  update(data: any) {
    useMarkPriceStore.getState().actions.updateMarkPrice(data);
  }
}

export { MarkPriceCalculator };
