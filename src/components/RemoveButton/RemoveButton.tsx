import styled from "styled-components";
import classNames from "classnames";
import close from "../../assets/close.png";
import { useStoreContext } from "../../stores/Store";
import { COLORS } from "../../styles/colors";

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
      data-alt="Remove Button"
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
    background-color: ${COLORS.gray100};
  }

  &.is-active {
    visibility: visible;
  }
`;

export default RemoveButton;
