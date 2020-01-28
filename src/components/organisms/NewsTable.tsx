import React from "react";
import styled from "styled-components";

import NewsTableBody from "../molecules/NewsTableBody";
import NewsPerTick from "../../models/NewsPerTick";

type NewsTableProps = {
  newsPerTicks: NewsPerTick[];
  pickedDate?: string;
};

const TableWrapper = styled.table`
  table-layout: fixed;
  width: 100%;
  min-width: 100%;
  border-collapse: collapse;
  border-style: hidden; /* 一番上と一番下には線を表示しない */
`;

function NewsTable(props: NewsTableProps) {
  return (
    <TableWrapper>
      {props.newsPerTicks.map(v => (
        <NewsTableBody
          key={v.date}
          isPicked={props.pickedDate === v.date}
          {...v}
        />
      ))}
    </TableWrapper>
  );
}

export default NewsTable;
