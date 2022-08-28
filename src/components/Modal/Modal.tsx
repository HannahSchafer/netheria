import styled from "styled-components";

interface ModalProps {
  children?: any;
  isOpen: boolean;
  styles?: any;
}

export function Modal({ children, isOpen, styles }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalContainer style={styles} aria-label="modal">
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  color: black;
  width: 500px;
  height: 200px;
  background-color: white;
  position: absolute;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

export default Modal;
