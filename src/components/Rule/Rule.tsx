import classNames from "classnames";
import styled from "styled-components";

interface RuleProps {
  isOpen: boolean;
}

export function Rule({ isOpen }: RuleProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <RuleContainer
      aria-label="overlay"
      className={classNames({ "is-active": isOpen })}
    ></RuleContainer>
  );
}
const RuleContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0 32px 0;
  height: 1px;
`;

export default Rule;
