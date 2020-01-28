import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";

import Change from "../atoms/Change";
import LinkedNews from "../atoms/LinkedNews";
import VolatileStock from "../../models/VolatileStock";

type StockAndChangeProps = VolatileStock & RouteComponentProps;

const StockTableDataWrapper = styled.td`
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const ChangeTableDataWrapper = styled.td`
  text-align: right;
  font-size: 12px;
  padding-right: 12px;
`;

const NewsTableDataWrapper = styled.td`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const OtherNewsCountWrapper = styled.span`
  font-size: 11px;
`;

const StockLinkWrapper = styled(Link)`
  text-decoration: none;
  color: #222;
  &:hover {
    color: #444;
    text-decoration: underline;
  }
`;

const VolatileStockRow = withRouter((props: StockAndChangeProps) => {
  const { stockCode, stockName, change, newsList } = props;
  const news = newsList && newsList[0];
  const otherNewsCount: number | undefined =
    newsList && newsList.length > 1 ? newsList.length - 1 : undefined;
  return (
    <>
      <StockTableDataWrapper>
        <StockLinkWrapper to={`/stocks/${stockCode}`}>
          {stockName}
        </StockLinkWrapper>
      </StockTableDataWrapper>
      <ChangeTableDataWrapper>
        <Change {...{ change }} />
      </ChangeTableDataWrapper>
      <NewsTableDataWrapper>
        {news && <LinkedNews key={`${stockCode}_${news.url}`} {...news} />}
        {otherNewsCount && (
          <OtherNewsCountWrapper>
            ほか{newsList!.length - 1}件
          </OtherNewsCountWrapper>
        )}
      </NewsTableDataWrapper>
    </>
  );
});

export default VolatileStockRow;
