import styled from "styled-components";
import getString from "../../utils/getString";
import { IPaneHeaderOption } from "../../types/types";

interface PaneHeaderProps {
  options: IPaneHeaderOption[];
  title: string;
  children?: React.ReactNode;
}

export function PaneHeader({ children, options, title }: PaneHeaderProps) {
  return (
    <PaneHeaderContainer aria-label="pane-header">
      <HeaderContainer>
        <Title>{getString(`${title}`)}</Title>
        {children}
      </HeaderContainer>
      <OptionHeadings>
        {options.map((opt: IPaneHeaderOption, i: number) => {
          return (
            <OptionHeading key={i} style={opt.styles}>
              {opt.title}
            </OptionHeading>
          );
        })}
      </OptionHeadings>
    </PaneHeaderContainer>
  );
}

const PaneHeaderContainer = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

const OptionHeadings = styled.div`
  color: #7b818a;
  display: flex;
  flex-direction: row;
`;

const OptionHeading = styled.div`
  width: 25%;
`;

const Title = styled.div`
  color: #7b818a;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export default PaneHeader;
