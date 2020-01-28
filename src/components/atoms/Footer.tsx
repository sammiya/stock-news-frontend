import React from "react";
import styled from "styled-components";
import isMobile from "../../utils/isMobile";

const Wrapper = styled.footer`
  color: #fff;
  background-color: #112;
  height: 40px;
  font-size: 12px;
  padding: 16px;
  letter-spacing: 2px;
  font-family: "Lato";
  position: ${isMobile ? "static" : "absolute"};
  box-sizing: border-box;
  width: 100%;
  bottom: 0;
  text-align: center;
`;

type FooterProps = {
  copyright: string;
};

function Footer(props: FooterProps) {
  const { copyright } = props;
  return <Wrapper>{copyright}</Wrapper>;
}

export default Footer;
