import React from "react";
import AsyncSelect from "react-select/async";
import { ActionMeta } from "react-select/src/types";

import Stock from "../../models/Stock";
import filterStockOptions from "../../utils/filterStockOptions";

type SelectStocksProps = {
  options: Stock[];
  onChange: (option: Stock) => void;
  maxSuggest: number;
};

function SelectStocks(props: SelectStocksProps) {
  return (
    <AsyncSelect
      loadOptions={(inputValue: string) =>
        Promise.resolve(
          filterStockOptions(props.options, inputValue, props.maxSuggest)
        )
      }
      components={{ DropdownIndicator: () => null }}
      options={props.options}
      onChange={(value: any, actionMeta: ActionMeta) => {
        props.onChange(value);
      }}
      getOptionValue={option => option.stockCode}
      getOptionLabel={option => {
        return `${option.stockName}(${option.stockCode})`;
      }}
      placeholder="銘柄名または銘柄コードで検索"
    />
  );
}

export default SelectStocks;
