import React from "react";

import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";
import { scroller, animateScroll as scroll } from "react-scroll";

// TODO: atoms や molecules から直接の import はしない
import Box from "../atoms/Box";
import StockChart from "../organisms/StockChart";
import NewsTable from "../organisms/NewsTable";
import DailyStockProps from "../../models/DailyStockProps";
import NewsPerTick from "../../models/NewsPerTick";
import StockInfo from "../../models/StockInfo"; ////TODO: market や industry もどこかに表示する？
import fetchStockPriceMovements from "../../api/fetchStockPriceMovements";
import isMobile from "../../utils/isMobile";

const ChartNewsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 100%;
  height: 100%;
  flex-direction: ${isMobile ? "column" : "row"};
`;

const ChartWrapper = styled(Box)`
  width: ${isMobile ? "100%" : "57%"};
  overflow-y: ${isMobile ? "visible" : "auto"};
  margin: 20px 0;
`;

const NewsWrapper = styled(Box)`
  width: 40%;
  overflow-y: auto;
  margin: 20px 0;
  width: ${isMobile ? "100%" : "40%"};
`;

type StockPageProps = {
  stockInfo: StockInfo;
} & RouteComponentProps<{ stockCode: string }>;

//TODO: 型定義は適切か？
type StockPageState = {
  chartData: DailyStockProps[] | undefined;
  pickedDate: string | undefined;
};

class StockPage extends React.Component<StockPageProps, StockPageState> {
  state: StockPageState = {
    chartData: undefined,
    pickedDate: undefined
  };
  componentDidMount() {
    this.loadStockPriceMovements();
  }

  componentDidUpdate(prevProps: StockPageProps) {
    if (
      this.props.match.params.stockCode !== prevProps.match.params.stockCode
    ) {
      this.loadStockPriceMovements();
    }
  }

  loadStockPriceMovements() {
    return fetchStockPriceMovements(this.props.match.params.stockCode).then(
      (chartData: DailyStockProps[]) => {
        this.setState({ chartData });
      }
    );
  }

  scrollToDate(date: string) {
    scroller.scrollTo(date, {
      duration: 0,
      delay: 0,
      offset: -100 /* TODO: 他の定数から計算する */,
      containerId: "news"
    });
  }

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  render() {
    return (
      <ChartNewsWrapper>
        <ChartWrapper>
          {this.state.chartData && (
            <StockChart
              data={this.state.chartData}
              onClick={(date: string) => {
                this.setState({
                  pickedDate: date
                });
                this.scrollToDate(date);
              }}
              onEndIndexChange={(endIndex: number) => {
                const chartData = this.state.chartData;
                if (!chartData) return;
                for (
                  let i = Math.min(endIndex, chartData.length - 1);
                  i >= 0;
                  i--
                ) {
                  const dailyStockProps = chartData[i];
                  if (dailyStockProps.newsList) {
                    this.scrollToDate(dailyStockProps.date);
                    return;
                  }
                }
                this.scrollToBottom();
              }}
            />
          )}
        </ChartWrapper>
        <NewsWrapper id="news">
          {this.state.chartData && (
            <NewsTable
              pickedDate={this.state.pickedDate}
              newsPerTicks={this.state.chartData
                .reduce((filtered: NewsPerTick[], option) => {
                  if (option.newsList) {
                    filtered.push({
                      date: option.date,
                      newsList: option.newsList,
                      change: option.change
                    });
                  }
                  return filtered;
                }, [])
                .reverse()}
            />
          )}
        </NewsWrapper>
      </ChartNewsWrapper>
    );
  }
}

export default withRouter(StockPage);
