import Stock from "../models/Stock";
import normalizeStr from "./normalizeStr";

function filterStockOptions(
  options: Stock[],
  inputValue: string,
  maxCount: number
): Stock[] {
  let filteredOptions: Stock[] = [];
  let count = 0;
  const normalizedInput = normalizeStr(inputValue);
  for (const option of options) {
    if (
      normalizedInput.match(/[0-9]/g)
        ? option.stockCode.startsWith(normalizedInput)
        : normalizeStr(option.stockName).includes(normalizedInput)
    ) {
      filteredOptions.push(option);
      if (++count === maxCount) break;
    }
  }
  return filteredOptions;
}

export default filterStockOptions;
