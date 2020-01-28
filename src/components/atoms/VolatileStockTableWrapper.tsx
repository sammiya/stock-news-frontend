import styled from "styled-components";

// TODO: フォルダ移動が必要か検討

const VolatileStockTableWrapper = styled.table`
  table-layout: fixed;
  width: 93%;
  min-width: 93%;
  margin-left: 3%;
  margin-right: 4%;

  border-collapse: collapse;
  border-width: 1px;
  border-style: solid;
  border-color: #aaa;

  & tbody {
    border-width: 1px;
    border-style: solid;
    border-color: #aaa;
  }

  & th,
  & td {
    border-width: 1px;
    border-style: ridge;
    border-color: #e2e2e2;

    border-right-color: #aaa;
    padding: 4px 2px;
  }
`;

export default VolatileStockTableWrapper;
