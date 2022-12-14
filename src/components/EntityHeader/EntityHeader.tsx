import getString from "../../utils/getString";
import moment from "moment";
import styled from "styled-components";
import { useStoreContext } from "../../stores/Store";
import { COLORS } from "../../styles/colors";

interface EntityHeaderProps {}

export function EntityHeader({}: EntityHeaderProps) {
  const {
    state: {
      allData: { configData },
    },
  } = useStoreContext();

  if (!configData) {
    return null;
  }

  const created = getString("created");
  const by = getString("by");
  const formattedDate = moment(configData.entityCreatedAt).fromNow();

  return (
    <StyledEntityHeader aria-label="entity-header" data-alt="Entity Header">
      <Title>{configData.entityTitle}</Title>
      <EntityInfo>
        {`${created} ${formattedDate} ${by} ${configData.entityAuthor}`}
      </EntityInfo>
    </StyledEntityHeader>
  );
}

const StyledEntityHeader = styled.div``;

const Title = styled.div`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
  color: ${COLORS.gray400};
`;

const EntityInfo = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.gray400};
`;

export default EntityHeader;
