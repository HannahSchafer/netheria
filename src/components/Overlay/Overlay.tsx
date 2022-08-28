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
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0.5;
    background: gray;
  }
`;

export default Overlay;
