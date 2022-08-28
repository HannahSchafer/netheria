import styled from "styled-components";

export const Rule = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0 32px 0;
  height: 1px;
`;

export const OptionSpacing = styled.div`
  margin-left: 8px;
  width: 30%;
  cursor: pointer;

  &.is-active {
    color: black;
  }
`;
