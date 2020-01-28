import React from "react";
import styled, { css } from "styled-components";

import { Element } from "react-scroll";

import LinkedNews from "../atoms/LinkedNews";
import NewsPerTick from "../../models/NewsPerTick";
import Change from "../atoms/Change";

type NewsTableBodyProps = NewsPerTick & { isPicked: boolean };

// 注意: table の border の優先順位が double > solid > ridge なのを利用したデザイン

const TbodyWrapper = styled.tbody<{ isPicked: boolean }>`
  border-width: 1px 0;
  ${props =>
    props.isPicked
      ? css`
           {
            border-style: double;
            background: #fdd;
            border-color: #f22;
            & tr {
              border-color: #ffc1c1;
            }
          }
        `
      : css`
           {
            border-style: solid;
            border-color: #aaa;
            & tr {
              border-color: #eee;
            }
          }
        `};
`;

const TrWrapper = styled.tr`
  border-width: 1px 0;
  border-style: ridge;
`;

const NewsDateThWrapper = styled.th`
  width: 70px;
  font-size: 14px;
  font-weight: normal;
  padding: 8px 0px;
`;

const ChangeTdWrapper = styled.td`
  width: 48px;
  font-size: 12px;
  padding-right: 12px;
`;

const NewsTdWrapper = styled.td`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
`;

function NewsTableBody(props: NewsTableBodyProps) {
  const { date, newsList, isPicked } = props;
  return (
    <TbodyWrapper key={`tbody_${date}`} {...{ isPicked }}>
      {newsList.map((news, index) => (
        <TrWrapper key={`${date}_${news.url}`}>
          <NewsDateThWrapper key={`th_${date}_${news.url}`}>
            {index === 0 && <Element name={date}></Element>}
            {props.date}
          </NewsDateThWrapper>
          <ChangeTdWrapper
            key={`td1_${date}_${news.url}`}
            style={{
              textAlign: props.change ? "right" : "center"
            }}
          >
            {props.change ? <Change change={props.change} /> : "-"}
          </ChangeTdWrapper>
          <NewsTdWrapper key={`td2_${date}_${news.url}`}>
            <LinkedNews {...news} />
          </NewsTdWrapper>
        </TrWrapper>
      ))}
    </TbodyWrapper>
  );
}

export default NewsTableBody;
