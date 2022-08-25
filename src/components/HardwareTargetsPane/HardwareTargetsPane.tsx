import {useState} from 'react';
import getString from '../../utils/getString';
import Dropdown from '../Dropdown/Dropdown';
import styled from "styled-components";
import { useStoreContext } from "../../Store";
import classNames from 'classnames';

export const TARGET_OPTS = [
  {
    title: "Provider",
    styles: {width: '30%'},
  }, 
  {
    title: "Instance",
    styles: {width: '30%'},
  }, 
  {
    title: "VCPU",
    styles: {width: '20%'},
  }, 
  {
    title: "Memory (GIB)",
    styles: {width: '20%'},
  },
  ]

const HARDWARE_CONFIG = {
  AWS: [{
    instance: "m4.large",
    cpu: 2,
    memory: 8,
  },
  {
    instance: "m4.xlarge",
    cpu: 4,
    memory: 16,
  },
  {
    instance: "m4.2xlarge",
    cpu: 8,
    memory: 32,
  },
  {
    instance: "m4.4xlarge",
    cpu: 16,
    memory: 64,
  },
],
  GCP: [{
    instance: "n2-standard-2",
    cpu: 2,
    memory: 8,
  }]
}

const NEW_SELECTION = {
  provider: "Select Provider",
  instance: "Select Instance",
  cpu: 0,
  memory: 0,
}

export function HardwareTargetsPane() {

  const {
    state: { hardwareTargetData, hardwareTargetObject },
    actions: { setHardwareTargetProvider, setHardwareTargetInstance, setHardwareTargetData }
  } = useStoreContext();

  const [instanceOptions, setInstanceOptions] = useState(null);
  const [canAddNewTarget, setCanAddNewTarget] = useState(false);

  const handleSelectProvider = (selection: any, index: number) => {
    setHardwareTargetProvider(selection)
    // @ts-expect-error
    const options = HARDWARE_CONFIG[selection];
    const instanceOpts = options.map(function(item: { [x: string]: any; }) { return item["instance"]; });
    setInstanceOptions(instanceOpts)
  }

  const handleSelectInstance= (selection: any, index: number) => {
    setHardwareTargetInstance(selection, index);
    setCanAddNewTarget(true);
  }

  const handleAddTarget = () => {
    const lastSelectionIndex = hardwareTargetData.length - 1;
    if (!canAddNewTarget) {
      return
    }
    setHardwareTargetData([...hardwareTargetData, NEW_SELECTION])
  }

  return (
    <div>
      <HeaderContainer>
        <Title>{getString("hardwareTargetsTitle")}</Title>
        <AddButton
          onClick={() => handleAddTarget()}
          role="button"
          className={classNames({
            'is-active': canAddNewTarget,
          })}
        >
          Add
        </AddButton>
      </HeaderContainer>
      <OptionHeadings>
        {TARGET_OPTS.map((opt, i) => {
          return (
            <OptionHeading style={opt.styles}>{opt.title}</OptionHeading>
          )
        })}
      </OptionHeadings>
      <Rule />
      <OptionsContainer>
        {hardwareTargetData.map((provider: any, i: any) => {
          return (
            <OptionsInnerContainer key={i}>
              <Dropdown
                displayData={{title: `${provider.provider}`}}
                handleSelect={handleSelectProvider}
                menuData={Object.keys(HARDWARE_CONFIG)}
                styles={{width: '30%', paddingLeft: '8px', cursor: 'pointer'}}
              />
              <Dropdown
                displayData={{title: `${provider.instance}`}}
                handleSelect={handleSelectInstance}
                menuData={instanceOptions}
                styles={{width: '30%', paddingLeft: '8px', cursor: 'pointer'}}
              />
              <div style={{ width: '20%', paddingLeft: '8px', cursor: 'pointer' }}>{provider.cpu}</div>
              <div style={{ width: '20%', paddingLeft: '8px', cursor: 'pointer' }}>{provider.memory}</div>
          </OptionsInnerContainer>
          )
        })}
      </OptionsContainer>
    </div>
  )
}

const AddButton = styled.div`
  color: white;
  background-color: #7B818A;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 0px 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  &.is-active {
    background-color: #0180FF;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
display: flex;
justify-content: space-between;
padding-bottom: 16px;
`;

const OptionsContainer = styled.div`
  color: #7B818A;
`;

const OptionHeadings = styled.div`
display: flex;
flex-direction: row;
`;

const OptionHeading = styled.div`
width: 25%;
`;

const OptionsInnerContainer = styled.div`
  display: flex;
  align-items: baseline;

`;

const Title = styled.div`
  color: #7B818A;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const Rule = styled.div`
  border-bottom: 1px solid #E0E0E0;
  margin: 10px 0 32px 0;
  height: 1px;
`;

export default HardwareTargetsPane;