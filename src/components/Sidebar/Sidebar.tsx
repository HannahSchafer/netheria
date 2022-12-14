import styled from "styled-components";
import icons from "../../assets";
import { COLORS } from "../../styles/colors";

export function Sidebar() {
  return (
    <SidebarContainer aria-label="sidebar" data-alt="Sidebar">
      <Icons>
        {icons.map((icon, i) => {
          return (
            <Icon className="icon" key={i}>
              <img className="img" src={icon}></img>
            </Icon>
          );
        })}
      </Icons>
    </SidebarContainer>
  );
}

const Icon = styled.div`
  .img {
    border-radius: 6px;
    padding: 10px;

    &:hover {
      background-color: ${COLORS.gray100};
    }
  }
`;

const Icons = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  .icon:nth-of-type(1) {
    flex-grow: 1;
  }
  .icon:nth-of-type(2) {
    flex-grow: 1;
  }
  .icon:nth-of-type(3) {
    flex-grow: 1;
  }
  .icon:nth-of-type(4) {
    flex-grow: 10;
    align-items: flex-end;
    display: flex;
  }
`;
const SidebarContainer = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 2px 8px rgba(46, 50, 56, 0.04),
    0px 8px 24px rgba(46, 50, 56, 0.08);
  display: block;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 64px;
  height: 100%;
  padding: 12px;
  background-color: ${COLORS.white};
`;
export default Sidebar;
