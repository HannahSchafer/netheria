import React from 'react';
import styled from "styled-components";

interface PaneProps {
  height?: number;
  title?: string;
  children?: any;
  styles?: any;
}

export function Pane({
  children,
  height,
  title,
  styles,
}: PaneProps) {
  return (
    <StyledPane style={styles}>
      <Title>{title}</Title>
      {children}
    </StyledPane>
  );
}

const StyledPane = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(46, 50, 56, 0.04), 0px 8px 24px rgba(46, 50, 56, 0.08);
`;

const Title = styled.div`
  color: #7B818A;
  font-weight: 300;
  font-size: 30px;
  line-height: 36px;
`;

export default Pane;
