import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";

import Stock from "../../models/Stock";
import SelectStocks from "../atoms/SelectStocks";
import isMobile from "../../utils/isMobile";

const TitleLinkWrapper = styled(Link)`
  color: #ffffff;
  letter-spacing: 3px;
  font-family: "Lato";
  font-weight: bold;
  position: relative;
  font-size: ${isMobile ? "16px" : "30px"};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SelectStocksWrapper = styled.span`
  width: 400px;
  margin-left: 50px;
`;

const Wrapper = styled.header`
  height: 50px;
  padding: 10px;
  background: -webkit-linear-gradient(to top, #89b8ff, #4b7fb3);
  background: linear-gradient(to top, #89b8ff, #4b7fb3);
  position: relative;
  display: flex;
`;

type HeaderProps = {
  title: string;
  stockOptions: Stock[];
} & RouteComponentProps;

const Header = withRouter((props: HeaderProps) => {
  return (
    <Wrapper>
      <TitleLinkWrapper to="/">{props.title}</TitleLinkWrapper>
      <SelectStocksWrapper>
        <SelectStocks
          options={props.stockOptions || []}
          onChange={(value: Stock) => {
            props.history.push({
              pathname: `/stocks/${value.stockCode}`
            });
          }}
          maxSuggest={100}
        />
      </SelectStocksWrapper>
    </Wrapper>
  );
});

export default Header;
