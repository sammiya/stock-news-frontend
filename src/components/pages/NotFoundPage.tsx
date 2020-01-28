import React from "react";
import styled from "styled-components";
import Box from "../atoms/Box";

const NotFoundPageWrapper = styled(Box)`
  width: 90%;
  margin: 10px auto;
  & p {
    margin: 0.5em;
  }
`;

function NotFoundPage() {
  return (
    <NotFoundPageWrapper innerPadding="10px">
      このページは存在しません。
    </NotFoundPageWrapper>
  );
}

export default NotFoundPage;
