import React from "react";
import styled from "styled-components";

import Box from "../atoms/Box";
import VolatileStockTable from "../organisms/VolatileStockTable";
import VolatileStockTablesMobile from "../organisms/VolatileStockTablesMobile";
import VolatileStockPerDate from "../../models/VolatileStockPerDate";

import fetchStocksVolatile from "../../api/fetchStocksVolatile";

import isMobile from "../../utils/isMobile";

const TopPageWrapper = styled(Box)`
  width: 90%;
  margin: 10px auto;
  & p {
    margin: 0.5em;
  }
`;

type TopPageProps = {};

type TopPageState = {
  stockPerDateList: VolatileStockPerDate[] | undefined;
};

class TopPage extends React.Component<TopPageProps, TopPageState> {
  state: TopPageState = {
    stockPerDateList: undefined
  };
  componentDidMount() {
    this.loadStocksVolatile();
  }

  loadStocksVolatile() {
    return fetchStocksVolatile().then(
      (stockPerDateList: VolatileStockPerDate[]) => {
        this.setState({ stockPerDateList });
      }
    );
  }

  render() {
    return (
      <>
        <TopPageWrapper innerPadding="10px" key="about">
          <p>
            <strong>株ANDニュース</strong>{" "}
            はニュースによる株の値動きを一目で確認できるサイトです。上の検索ボックスより、確認したい銘柄を検索してください。
          </p>
        </TopPageWrapper>
        <TopPageWrapper innerPadding="10px" key="volatile-stock">
          {isMobile ? (
            <VolatileStockTablesMobile
              stockPerDateList={
                this.state.stockPerDateList || [] /* TODO: 修正？ */
              }
            />
          ) : (
            <VolatileStockTable
              stockPerDateList={
                this.state.stockPerDateList || [] /* TODO: 修正？ */
              }
            />
          )}
        </TopPageWrapper>
      </>
    );
  }
}

export default TopPage;
