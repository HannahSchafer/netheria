import styled from "styled-components";
import classNames from "classnames";
import close from "../../assets/close.png";
import { useStoreContext } from "../../Store";

interface RemoveButtonProps {
  isActive?: boolean;
  index: number;
  targetType: string;
}

export function RemoveButton({
  isActive,
  index,
  targetType,
}: RemoveButtonProps) {
  const {
    actions: { setRemoveTarget },
  } = useStoreContext();

  const handleClickRemove = (index: number) => {
    setRemoveTarget(index, targetType);
  };

  return (
    <RemoveButtonContainer
      aria-label="remove-button"
      onClick={() => handleClickRemove(index)}
      className={classNames({
        "is-active": isActive,
      })}
    >
      <img src={close}></img>
    </RemoveButtonContainer>
  );
}

const RemoveButtonContainer = styled.div`
  border-radius: 6px;
  padding: 6px;
  visibility: hidden;

  &:hover {
    background-color: #f3f3f3;
  }

  &.is-active {
    visibility: visible;
  }
`;

export default RemoveButton;
