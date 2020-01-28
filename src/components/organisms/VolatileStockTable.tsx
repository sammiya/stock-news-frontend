import React from "react";

import VolatileStockTableWrapper from "../atoms/VolatileStockTableWrapper";
import VolatileStockPerDateTableBody from "../molecules/VolatileStockPerDateTableBody";
import VolatileStockPerDate from "../../models/VolatileStockPerDate";

type VolatileStockTableProps = {
  stockPerDateList: VolatileStockPerDate[];
};

function VolatileStockTable(props: VolatileStockTableProps) {
  return (
    <VolatileStockTableWrapper>
      <colgroup>
        <col style={{ width: "100px" }} />
        <col style={{ width: "180px" }} />
        <col style={{ width: "60px" }} />
        <col />
        <col style={{ width: "180px" }} />
        <col style={{ width: "60px" }} />
        <col />
      </colgroup>

      <tbody>
        <tr>
          <th />
          <th colSpan={3}>急上昇した株とニュース</th>
          <th colSpan={3}>急下降した株とニュース</th>
        </tr>
      </tbody>

      {props.stockPerDateList.map(v => (
        <VolatileStockPerDateTableBody key={v.date} {...v} />
      ))}
    </VolatileStockTableWrapper>
  );
}

export default VolatileStockTable;
