import styled from "styled-components";
import { COLORS } from "./colors";

export const Rule = styled.div`
  border-bottom: 1px solid #e0e0e0;
  height: 1px;
  margin: 10px 0 32px 0;
`;

export const OptionSpacing: any = styled.div.attrs(
  (props: { paddingBottom?: string; width: string }) => props
)`
  cursor: pointer;
  margin-left: 8px;
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "16px"};
  width: ${(props) => (props.width ? props.width : "30%")};

  &.is-active {
    color: ${COLORS.black};
  }
`;
