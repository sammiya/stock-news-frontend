import React from "react";
import styled from "styled-components";

import News from "../../models/News";

type LinkedNewsProps = News;

const LinkedNewsWrapper = styled.a`
  text-decoration: none;
  color: #03d;
  &:visited {
    color: #73a;
  }
  &:hover {
    text-decoration: underline;
    color: #01a;
  }
`;

function LinkedNews(props: LinkedNewsProps) {
  const { url, title } = props;
  return <LinkedNewsWrapper href={url}>{title}</LinkedNewsWrapper>;
}

export default LinkedNews;
