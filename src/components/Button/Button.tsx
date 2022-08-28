import classNames from "classnames";
import styled from "styled-components";

interface ButtonProps {
  children: any;
  color: string;
  padding?: string;
  isActive: boolean;
  onClick: () => void;
}

export function Button({
  children,
  color,
  isActive,
  onClick,
  padding,
}: ButtonProps) {
  return (
    <ButtonContainer
      aria-label="button"
      className={classNames({
        "is-active": isActive,
      })}
      onClick={() => onClick()}
      color={color}
      padding={padding}
    >
      {children}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div.attrs(
  (props: { color: string; padding: string }) => props
)`
  color: white;
  background-color: #7b818a;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  padding: ${(props) => (props.padding ? props.padding : "8px 16px")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  &.is-active {
    background-color: ${(props) => props.color};
    cursor: pointer;
  }
`;

export default Button;
