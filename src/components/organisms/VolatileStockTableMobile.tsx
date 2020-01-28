import React from "react";

import VolatileStockTableWrapper from "../atoms/VolatileStockTableWrapper";
import VolatileStockRow from "../molecules/VolatileStockRow";
import VolatileStock from "../../models/VolatileStock";

type VolatileStockTableMobileProps = {
  volatileStockList: VolatileStock[];
};

function VolatileStockTableMobile(props: VolatileStockTableMobileProps) {
  return (
    <VolatileStockTableWrapper>
      <colgroup>
        <col style={{ width: "100px" }} />
        <col style={{ width: "60px" }} />
        <col />
      </colgroup>
      <tbody>
        {props.volatileStockList.map((v, i) => (
          <tr key={i}>
            <VolatileStockRow {...v} />
          </tr>
        ))}
      </tbody>
    </VolatileStockTableWrapper>
  );
}

export default VolatileStockTableMobile;
