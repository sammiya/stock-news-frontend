import React from "react";

import VolatileStockTableMobile from "./VolatileStockTableMobile";

import VolatileStockPerDate from "../../models/VolatileStockPerDate";

type VolatileStockTablesMobileProps = {
  stockPerDateList: VolatileStockPerDate[];
};

function VolatileStockTablesMobile(props: VolatileStockTablesMobileProps) {
  return (
    <>
      {props.stockPerDateList.map((v, i) => (
        <div key={i}>
          <header style={{ fontSize: "110%", lineHeight: "150%" }}>
            {v.date}
          </header>
          <span
            style={{ fontSize: "105%", lineHeight: "140%", padding: "2px" }}
          >
            上昇した銘柄
          </span>
          <VolatileStockTableMobile
            key="rising"
            volatileStockList={v.volatileStocks.map(v => v.rising)}
          ></VolatileStockTableMobile>
          <span
            style={{ fontSize: "105%", lineHeight: "150%", padding: "2px" }}
          >
            下降した銘柄
          </span>
          <VolatileStockTableMobile
            key="falling"
            volatileStockList={v.volatileStocks.map(v => v.falling)}
          ></VolatileStockTableMobile>
        </div>
      ))}
    </>
  );
}

export default VolatileStockTablesMobile;
