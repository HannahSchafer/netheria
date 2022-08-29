import classNames from "classnames";
import styled from "styled-components";

interface OverlayProps {
  isOpen: boolean;
}

export function Overlay({ isOpen }: OverlayProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <OverlayContainer
      aria-label="overlay"
      className={classNames({ "is-active": isOpen })}
    ></OverlayContainer>
  );
}
const OverlayContainer = styled.div`
  &.is-active {
    background: gray;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export default Overlay;
