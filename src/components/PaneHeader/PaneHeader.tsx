import styled from "styled-components";
import getString from "../../utils/getString";
import { IPaneHeaderOption } from "../../types/types";
import { COLORS } from "../../styles/colors";

interface PaneHeaderProps {
  options: IPaneHeaderOption[];
  title: string;
  children?: React.ReactNode;
}

export function PaneHeader({ children, options, title }: PaneHeaderProps) {
  return (
    <div aria-label="pane-header">
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
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

const OptionHeadings = styled.div`
  color: ${COLORS.gray500};
  display: flex;
  flex-direction: row;
  font-size: 10px;
  font-weight: 500;
`;

const OptionHeading = styled.div`
  width: 25%;
`;

const Title = styled.div`
  color: ${COLORS.gray500};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export default PaneHeader;
