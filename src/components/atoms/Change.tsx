import React from "react";

type ChangeProps = { change: number };

function Change(props: ChangeProps) {
  const { change } = props;
  const isPositive = change >= 0;
  return (
    <span style={{ color: isPositive ? "green" : "red" }}>
      {change > 0 && "+"}
      {(Math.round(change * 100 * 10) / 10).toFixed(1)}%
    </span>
  );
}

export default Change;
