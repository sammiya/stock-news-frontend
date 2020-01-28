import React, { ReactNode } from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  color: #222;
`;

type BoxProps = {
  innerPadding?: string | number;
  children?: ReactNode;
  [propName: string]: any;
};

function Box(props: BoxProps) {
  const { innerPadding, children, ...rest } = props;
  return (
    <BoxWrapper {...rest}>
      <div style={{ padding: innerPadding || "5px" }}>{children}</div>
    </BoxWrapper>
  );
}

export default Box;
