import React from "react";

import styled, { createGlobalStyle } from "styled-components";

import Header from "./components/organisms/Header";
import Footer from "./components/atoms/Footer";
import StockPage from "./components/pages/StockPage";
import TopPage from "./components/pages/TopPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import fetchStockOptions from "./api/fetchStockOptions";
import Stock from "./models/Stock";
import StockInfo from "./models/StockInfo";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  html,body,#root,.App{
    min-height: 100%;
    height: 100%;
  }
  body {
    background-color: #B3E5FC;
  }
`;

const ContentWrapper = styled.div`
  height: calc(100% - 112px); /* Header: 72px, Footer: 40px */
`;

type AppState = {
  stockOptions: Stock[] | null; // stockCode と stockName だけでいいかも
  stockInfoByCode: Map<string, StockInfo> | null;
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { stockOptions: null, stockInfoByCode: null };
  }

  componentDidMount() {
    this.loadStockOptions();
  }

  loadStockOptions() {
    return fetchStockOptions().then(
      (arr: (StockInfo & { stockCode: string })[]) => {
        this.setState({ stockOptions: arr });
        this.setState({
          stockInfoByCode: new Map(
            arr.map(v => {
              const { stockCode: key, ...value } = v;
              return [key, value];
            })
          )
        });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <Header
            title="株ANDニュース"
            stockOptions={this.state.stockOptions || [] /* TODO: 修正?*/}
          />
          <Switch>
            <Route path="/" exact component={TopPage} />
            <Route
              path="/stocks/:stockCode"
              //component={StockPage}
              render={props =>
                this.state.stockInfoByCode && (
                  <ContentWrapper className="Content">
                    <StockPage
                      {...props}
                      stockInfo={
                        this.state.stockInfoByCode.get(
                          props.match.params.stockCode
                        )! /* TODO: delete non-null assertion operator */
                      }
                    />
                  </ContentWrapper>
                )
              }
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
        <Footer copyright="© 2019 Team 3σs" />
      </div>
    );
  }
}

export default App;
