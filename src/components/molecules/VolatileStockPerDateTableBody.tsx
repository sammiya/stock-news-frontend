import React from "react";
import styled from "styled-components";

import VolatileStockRow from "./VolatileStockRow";
import VolatileStockPerDate from "../../models/VolatileStockPerDate";

type VolatileStockProps = VolatileStockPerDate;

const TableHeaderWrapper = styled.th`
  width: 100px;
`;

function VolatileStockPerDateTableBody(props: VolatileStockProps) {
  return (
    <tbody>
      {props.volatileStocks.map((v, i) => (
        <tr key={i}>
          {i === 0 && (
            <TableHeaderWrapper rowSpan={props.volatileStocks.length}>
              {props.date}
            </TableHeaderWrapper>
          )}
          <VolatileStockRow key={`rising_${i}`} {...v.rising} />
          <VolatileStockRow key={`falling_${i}`} {...v.falling} />
        </tr>
      ))}
    </tbody>
  );
}

export default VolatileStockPerDateTableBody;
