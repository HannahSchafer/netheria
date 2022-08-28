import styled from "styled-components";

export const Rule = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0 32px 0;
  height: 1px;
`;

export const OptionSpacing = styled.div.attrs(
  (props: { paddingBottom?: string; width: string }) => props
)`
  margin-left: 8px;
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "16px"};
  width: ${(props) => (props.width ? props.width : "30%")};
  cursor: pointer;
s
  &.is-active {
    color: black;ss
  }
`;
