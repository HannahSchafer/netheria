import styled from "styled-components";
import { PaneStyles } from "../../types/types";
import { COLORS } from "../../styles/colors";

interface PaneProps {
  children: React.ReactNode;
  styles?: PaneStyles;
}

export function Pane({ children, styles }: PaneProps) {
  return (
    <StyledPane aria-label="pane" style={styles}>
      {children}
    </StyledPane>
  );
}

const StyledPane = styled.div`
  background-color: ${COLORS.white};
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(46, 50, 56, 0.04),
    0px 8px 24px rgba(46, 50, 56, 0.08);
`;

export default Pane;
